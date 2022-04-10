import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cabeçalho from '../components/Cabeçalho';
import { fetchCurrency, despesaInfo, fetchAll } from '../actions';

const alimenta = 'Alimentação';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      moedaAtual: 'BRL',
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimenta,
    };
  }

  componentDidMount() {
    const { dispatchInfo } = this.props;
    dispatchInfo();
  }

  fetchAll= async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resultado = await response.json();
    return resultado;
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

      newState = () => {
        const { walletExpenses } = this.props;
        const novoTotal = walletExpenses
          .map((despesa) => Number(despesa.value)
    * Number(despesa.exchangeRates[despesa.currency].ask))
          .reduce((att, crr) => att + crr, 0).toFixed(2);
        return novoTotal;
      };

  handleClick = async (event) => {
    event.preventDefault();
    const { dispatchDespesa } = this.props;
    const { id, value, description, method, tag, currency } = this.state;
    const valorDoCambio = await this.fetchAll();
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    dispatchDespesa({
      id,
      value,
      description,
      tag,
      method,
      currency,
      exchangeRates: valorDoCambio,
    });
    this.setState({
      total: this.newState(),
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimenta,
    });
  }

  render() {
    const { walletState, walletCurrencies = [] } = this.props;
    const { total, moedaAtual, value,
      currency, description, tag, method } = this.state;
    return (
      <header>
        <div data-testid="email-field">
          { `${walletState.email}` }
        </div>
        <div data-testid="total-field">
          { total }
        </div>
        <div data-testid="header-currency-field">
          { moedaAtual }
        </div>
        <br />
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleInput }
              type="number"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              name="description"
              value={ description }
              onChange={ this.handleInput }
              id="descricao"
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="Moeda">
            Moeda:
            <select
              value={ currency }
              onChange={ this.handleInput }
              name="currency"
              data-testid="currency-input"
              id="Moeda"
            >
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
            <select
              id="pagamento"
              data-testid="method-input"
              onChange={ this.handleInput }
              value={ method }
              name="method"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            <select
              data-testid="tag-input"
              id="categoria"
              value={ tag }
              name="tag"
              onChange={ this.handleInput }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
        <Cabeçalho />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  walletState: state.user,
  walletCurrencies: state.wallet.currencies,
  walletExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDespesa: (state) => dispatch(despesaInfo(state)),
  dispatchInfo: (state) => dispatch(fetchCurrency(state)),
  dispatchAll: (state) => dispatch(fetchAll(state)),
});

Wallet.propTypes = {
  walletState: PropTypes.func.isRequired,
  dispatchInfo: PropTypes.func.isRequired,
  dispatchDespesa: PropTypes.func.isRequired,
  walletCurrencies: PropTypes.func.isRequired,
  walletExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
