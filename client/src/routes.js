import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import history from './history.js';
import AppContainer from './containers/App.js';
import App from './app.js';
import NotFoundPage from './components/NotFoundPage.js';
import { paths } from './config/config.json';

const { urlBase, routeBase } = paths;

const routes = (
  <Router history={history}>
    <Route path={urlBase + routeBase} component={App} >
      <IndexRoute component={AppContainer} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  </Router>
);

export default routes;
