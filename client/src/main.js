'use strict';

var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes.js'),
    InitializeActions = require('./actions/initializeActions.js');

InitializeActions.initApp();

// add Router.HistoryLocation if you want to use clean HTML5 router without #
Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
