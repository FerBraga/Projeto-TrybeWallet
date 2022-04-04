import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      moeda: 'BRL',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrency());
  }

  render() {
    const { walletState, walletCurrencies = [] } = this.props;
    const { total, moeda } = this.state;
    return (
      <header>
        <div data-testid="email-field">
          { `${walletState.email}` }
        </div>
        <div data-testid="total-field">
          {total}
        </div>
        <div data-testid="header-currency-field">
          { moeda }
        </div>
        <br />
        <form>
          <label htmlFor="value">
            Valor:
            <input id="value" type="number" data-testid="value-input" />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input id="descricao" type="text" data-testid="description-input" />
          </label>
          <label htmlFor="Moeda">
            Moeda:
            <select data-testid="currency-input" id="Moeda">
              {walletCurrencies.map((coin) => (
                <option
                  key={ coin }
                  name="coin"
                  value={ coin }
                >
                  { `${coin}` }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select id="pagamento" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            <select data-testid="tag-input" id="categoria">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  walletState: state.user,
  walletCurrencies: state.wallet.currencies,
});

Wallet.propTypes = {
  walletState: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  walletCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
