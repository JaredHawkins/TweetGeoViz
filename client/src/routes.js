'use strict';

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name='app' path='/' handler={require('./components/app.js')}>
    <DefaultRoute handler={require('./components/mapPage/mapPage.js')} />

    <Route name='search' handler={require('./components/mapPage/mapPage.js')} />

    // not found page
    <NotFoundRoute handler={require('./components/notFoundPage/notFoundPage.js')} />
  </Route>
);

module.exports = routes;
