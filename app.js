//express framework for handling routes
express = require("express");
app = express();

//mongodb driver
mongo = require('mongodb');
mongoUri = process.env.MONGOLAB_URI
	|| process.env.MONGOHQ_URL
	|| 'mongodb://127.0.0.1:27017/twitter';

ObjectID = require('mongodb').ObjectID;
MongoClient = require('mongodb').MongoClient;
database = null;

//helper functions for interacting with the db in a reasonable fashion
mongoHelpers = require('./mongoHelpers.js');
connect = mongoHelpers.connect;

//set up the app
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'j4IjCQtMcWTsahgMCFCS' }));  //TODO get this out of the public repo

// Load our routes
require('./routes.js');

//start the app
var port = process.env.PORT || 2063;
app.listen(port, function() {
  console.log("Listening on " + port);
});
