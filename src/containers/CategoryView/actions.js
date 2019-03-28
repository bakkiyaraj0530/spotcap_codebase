/*
 *
 * CategoryView actions
 *
 */

export const TRANSACTIONS = 'TRANSACTIONS'
export const RULES = 'RULES'

const transactions = require('./../../json/transactions.json');
const rules = require('./../../json/rules.json');

export function getTransactions() {
  return {
    type: TRANSACTIONS,
    transactionsdata: transactions
  };
}
export function getRules() {
  return {
      type: RULES,
      rulesdata: rules
   };
}

