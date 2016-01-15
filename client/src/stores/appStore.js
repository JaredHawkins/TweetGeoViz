import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import history from '../history.js';
import { syncHistory } from 'redux-simple-router';
import rootReducer from '../reducers/index';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(history);

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk, reduxRouterMiddleware ] :
  [ thunk, reduxRouterMiddleware, logger() ];

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default store;
