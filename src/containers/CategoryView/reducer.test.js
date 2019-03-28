/*
 *
 * ClaimsHistory reducer
 *
 */
// import moment from 'moment';
import {
  TRANSACTIONS,
  RULES,
} from './constants';
import transactionViewReducer from './reducer';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    const equalvalue = {
      transactionsdata: {},
        rulesdata: {},
    };
    expect(transactionViewReducer(undefined, "")).toEqual(equalvalue);
  })

  it('should handle GET_TRANSATIONS', () => {
    const trxgetvalue = {
      type: TRANSACTIONS,
      transactionsdata: 'Transaction data',
    };
    expect(
      transactionViewReducer({},trxgetvalue)
    ).toEqual({
        transactionsdata: 'Transaction data',
      }
    )    
  })

  it('should handle GET_RULES', () => {
    const rulesgetvalue = {
      type: RULES,
      rulesdata: 'Transaction data',
    };
    expect(
      transactionViewReducer({},rulesgetvalue)
    ).toEqual({
      rulesdata: 'Transaction data',
      }
    )    
  })
})