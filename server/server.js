'use strict';

/* global require, process, console */

var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    config = require('./config/config.json'),
    authRequest = require('./middlewares/authRequest.js'),
    allowCORSHandler = require('./middlewares/allowCORS.js'),
    notFoundRequest = require('./middlewares/notFound.js'),
    logErrorsHandler = require('./middlewares/logErrors.js'),
    errorHandler = require('./middlewares/serverError.js'),
    fs = require('fs'),
    moment = require('moment'),
    app = express(),
    ip = config.ip || 'localhost',
    port = config.port || 3000,
    apiPrefix = config.apiPrefix || 'api',
    apiVersion = config.apiVersion || 'v1';

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
