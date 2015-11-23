'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('./routes.js');
var InitializeActions = require('./actions/initializeActions.js');

InitializeActions.initApp();

// add Router.HistoryLocation if you want to use clean HTML5 router without #
Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
