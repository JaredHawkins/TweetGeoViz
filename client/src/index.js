import React from 'react';
import { Router, Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes.js';
import { browserHistory } from 'react-router';
import configureStore from './store/configureStore.js';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/en" />
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
