export const TRANSACTIONS = 'TRANSACTIONS'
export const RULES = 'RULES'

const transactions = require('./../json/transactions.json');
const rules = require('./../json/rules.json');

const initialState = {
  transactionsdata: {},
  rulesdata: {}
}

export default (state = initialState, action) => {
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

export const transactionsaction = () => {
  return dispatch => {
    dispatch({
      type: TRANSACTIONS,
      transactionsdata: transactions
    })
  }
}
export const rulesaction = () => {
  return dispatch => {
    dispatch({
      type: RULES,
      rulesdata: rules
    })
  }
}
