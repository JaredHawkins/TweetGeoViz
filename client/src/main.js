'use strict';

/* global require, document */

var render = require('react-dom').render;
var routes = require('./routes.js');
var InitializeActions = require('./actions/initializeActions.js');

InitializeActions.initApp();

render(routes, document.getElementById('app'));
