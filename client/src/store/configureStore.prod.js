import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';

export default function configureStore(initialState) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(browserHistory);

  const finalCreateStore = compose(
    applyMiddleware(thunk, reduxRouterMiddleware)
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  return store;
}
