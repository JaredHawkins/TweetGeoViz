import React from 'react';
import { Router, Route, NotFoundRoute, IndexRoute } from 'react-router';
import history from './history.js';
import App from './components/app.js';
import MapPage from './components/mapPage/mapPage.js';
import NotFoundPage from './components/notFoundPage/notFoundPage.js';
import { paths } from './config/config.json';

const { urlBase, routeBase } = paths;

const routes = (
  <Router history={history}>
    <Route path={urlBase + routeBase} component={App} >
      <IndexRoute component={MapPage} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  </Router>
);

export default routes;
