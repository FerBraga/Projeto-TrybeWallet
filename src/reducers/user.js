import { INFO_USER } from '../actions/index';

const INITIAL_STATE = {

  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INFO_USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
