import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';
import logger from 'redux-logger';
import rootReducer from '../reducers/index.js';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';

export default function configureStore(initialState) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(browserHistory);

  const finalCreateStore = compose(
    applyMiddleware(invariant(), thunk, reduxRouterMiddleware, logger()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
