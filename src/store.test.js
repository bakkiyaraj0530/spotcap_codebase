import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

describe('Create Store ', () => {
  let store;

  beforeAll(() => {
    store = createStore(connectRouter(history)(rootReducer),
      initialState,
      composedEnhancers);
  });

  describe('Load store object ', () => {
    it('should contain an object for async reducers', () => {
      expect(typeof store).toBe('object');
    });
  });

});
