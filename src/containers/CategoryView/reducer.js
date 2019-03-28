/*
 *
 * View reducer
 *
 */
// import moment from 'moment';
import {
  TRANSACTIONS,
  RULES
} from './constants';

const initialState = {
  transactionsdata: {},
  rulesdata: {}
};

function transactionViewReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTIONS: 
      return {
        ...state,
        transactionsdata: action.transactionsdata
      }
    case RULES: 
      return {
        ...state,
        rulesdata: action.rulesdata
      }
    default:
      return state
  }
}

export default transactionViewReducer;
