import { INFO_WALLET, INFO_DESPESA } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INFO_WALLET:
    return {
      ...state,
      currencies: action.payload,
    };
  case INFO_DESPESA:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default walletReducer;
