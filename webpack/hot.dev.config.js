'use strict';

var config = require('./dev.config.js');

// reload page for every change
config.entry.push('webpack-dev-server/client?http://localhost:8080');

module.exports = config;
