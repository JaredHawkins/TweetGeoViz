'use strict';

var React = require('react'),
    Router = require('react-router'),
    DefaultRoute = Router.DefaultRoute,
    Route = Router.Route,
    NotFoundRoute = Router.NotFoundRoute,
    Redirect = Router.Redirect;

var routes = (
  <Route name='app' path='/' handler={require('./components/app.js')}>
    <DefaultRoute handler={require('./components/map/map.js')} />

    <Route name='map' handler={require('./components/map/map.js')} />

    // redirects
    <Redirect from='/' to='map' />

    // not found page
    <NotFoundRoute handler={require('./components/notFoundPage/notFoundPage.js')} />
  </Route>
);

module.exports = routes;
