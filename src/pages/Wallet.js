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
    const { walletState } = this.props;
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
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  walletState: state.user,
});

Wallet.propTypes = {
  walletState: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
