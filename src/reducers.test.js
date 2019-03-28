/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import expect from 'expect';
import transactionViewReducer from './containers/CategoryView/reducer';

describe('Combine Reducers', () => {
  it('should handle transactionViewReducer for Transactions data ', () => {
    const transactionsdata = 'Transaction data';
    expect(
      transactionViewReducer([], {
        type: 'TRANSACTIONS',
        transactionsdata
      })
    ).toEqual(
      { transactionsdata: 'Transaction data' }
    );
    });
    it('should handle transactionViewReducer for rules data', () => {
      const rulesdata = 'Rules data';
      expect(
        transactionViewReducer([], {
          type: 'RULES',
          rulesdata
        })
      ).toEqual(
        { rulesdata: 'Rules data' }
      );
    });
});
