import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Cabeçalho extends React.Component {
  render() {
    const { stateExpenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { stateExpenses.map((expense) => (
          <tr key={ expense.id }>
            <td>
              { expense.description }
            </td>
            <td>
              { expense.tag }
            </td>
            <td>
              { expense.method }
            </td>
            <td>
              { Number(expense.value).toFixed(2)}
            </td>
            <td>
              { expense.exchangeRates[expense.currency].name }
            </td>
            <td>
              { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
            </td>
            <td>
              { (Number(expense.value)
              * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)}
            </td>
            <td>
              Real
            </td>
          </tr>))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  stateExpenses: state.wallet.expenses,
});

Cabeçalho.propTypes = {
  stateExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Cabeçalho);
