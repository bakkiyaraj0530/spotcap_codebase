/*
 *
 * CategoryView actions
 *
 */
import {
  TRANSACTIONS,
  RULES,
} from './constants';

import * as actions from './actions';


describe('actions', () => {
  it('should create an action to get Transations ', () => {
    const transactionsdata = require('./../../json/transactions.json');
    const expectedAction = {
      type: TRANSACTIONS,
      transactionsdata
    }
    expect(actions.getTransactions(transactionsdata)).toEqual(expectedAction);
  });

  it('should create an action to get rules ', () => {
    const rulesdata = require('./../../json/rules.json');
    const expectedAction = {
      type: RULES,
      rulesdata
    }
    expect(actions.getRules(rulesdata)).toEqual(expectedAction);
  });

})


