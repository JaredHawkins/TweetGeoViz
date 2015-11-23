'use strict';

/* global require, document */

var render = require('react-dom').render,
    routes = require('./routes.js'),
    InitializeActions = require('./actions/initializeActions.js');

InitializeActions.initApp();

render(routes, document.getElementById('app'));
