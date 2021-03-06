/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import transactionViewReducer from './containers/CategoryView/reducer';

export default combineReducers({    
    transactions: transactionViewReducer,
  });
