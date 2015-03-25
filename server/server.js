/*global process, require, __dirname*/

var express = require('express'),
    mongo = require('mongodb'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    monk = require('monk'),
    path = require('path'),
    config = require('../config/config.json'),
    dbConfig = config.mongo || {},
    app = express();

var db = monk(dbConfig.server + dbConfig.databaseName);

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, './public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

// Load our routes
app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  res.status(404);
  res.json('Page Not Found.');
});

//start the app
var port = process.env.PORT || config.serverPort;
app.listen(port, function() {
  console.log('Listening on ' + port);
});