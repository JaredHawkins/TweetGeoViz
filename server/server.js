'use strict';

/* global require, process, console */

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');
var config = require('./config/config.json');
var authRequest = require('./middlewares/authRequest.js');
var allowCORSHandler = require('./middlewares/allowCORS.js');
var notFoundRequest = require('./middlewares/notFound.js');
var logErrorsHandler = require('./middlewares/logErrors.js');
var errorHandler = require('./middlewares/serverError.js');
var fs = require('fs');
var moment = require('moment');
var app = express();
var ip = config.ip || 'localhost';
var port = config.port || 3000;
var apiPrefix = config.apiPrefix || 'api';
var apiVersion = config.apiVersion || 'v1';

require('console-stamp')(console, {
  pattern: 'dd/mmm/yyyy:HH:MM:ss o'
});

logger.token('date', function() {
  return moment().format('DD/MMM/YYYY:HH:mm:ss ZZ');
});

app.use(logger('common'));
app.use(bodyParser.json());

app.use('/*', allowCORSHandler);
app.use(apiPrefix + '/*', authRequest);
app.use([apiPrefix + apiVersion, apiPrefix], routes);
app.use(notFoundRequest);

app.use(logErrorsHandler);
app.use(errorHandler);

// set the port for the webservice
if (process.argv.length > 2) {
  port = process.argv[2];
}

// set process title
if (process.argv.length > 3) {
  process.title = process.argv[3];
}

// output process pid into a file
if (process.argv.length > 4) {
  fs.writeFile(process.argv[4], process.pid);
}

// Start the server
app.set('port', port);
app.listen(app.get('port'), ip, function() {
  console.log('WebService has started on %s:%s', ip, port);
});
