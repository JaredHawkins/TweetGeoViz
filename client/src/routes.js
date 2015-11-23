'use strict';

var React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    NotFoundRoute = ReactRouter.NotFoundRoute,
    IndexRoute = require('react-router').IndexRoute,
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    //Keeping createHistory around until we know for sure we aren't going to use hashed based history
    //createHistory = require('history/lib/createHashHistory'),

    App = require('./components/app.js'),
    MapPage = require('./components/mapPage/mapPage.js'),
    NotFoundPage = require('./components/notFoundPage/notFoundPage.js');

// Remove this comment when we know fore sure we are not going to use
// hash based url's which is needed to support IE8 and IE9.
// var history = createHistory({
//   queryKey: false
// });

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path='/' component={App} >
      <IndexRoute component={MapPage} />
      <Route path='*' component={NotFoundPage} />
    </Route>
  </Router>
);

module.exports = routes;
