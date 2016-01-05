'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var IndexRoute = require('react-router').IndexRoute;
var history = require('./history.js');
var App = require('./components/app.js');
var MapPage = require('./components/mapPage/mapPage.js');
var NotFoundPage = require('./components/notFoundPage/notFoundPage.js');

var routes = (
  <Router history={history}>
    <Route path='/' component={App} >
      <IndexRoute component={MapPage} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  </Router>
);

module.exports = routes;
