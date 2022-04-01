import { INFO_WALLET } from '../actions/index';

const INITIAL_STATE = {

  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INFO_WALLET:
  default:
    return state;
  }
};

export default walletReducer;
