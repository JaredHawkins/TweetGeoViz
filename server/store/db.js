var mongoose = require('mongoose'),
    config = require('../config/config.json').mongo;

var connectWithRetry = function() {
  return mongoose.connect(
    config.server + config.databaseName,
    config.connectionOptions,
    function(err) {
      if (err) {
        console.error('Failed to connect to MongoDB on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
      }
    }
  );
};

var db = {
  /**
   * Connect to mongodb
   *
   */
  connect: function() {
    var isConnectedBefore = false;

    // connect to Mongo and retry  if fails.
    connectWithRetry();

    // connection events
    mongoose.connection.on('error', function(err){
      console.error('Failed to connect to MongoDB.', err);
    });

    mongoose.connection.once('connected', function() {
      console.log('Connected to MongoDB!');
      isConnectedBefore = true;
    });

    mongoose.connection.on('reconnected', function() {
      console.log('Reconnected to MongoDB!');
    });

    mongoose.connection.on('timeout', function() {
      console.log('MongoDB server timeout!');
    });

    mongoose.connection.on('disconnected', function() {
      if (isConnectedBefore) {
        console.log('MongoDB connection lost, trying to reconnect...');
      }
    });
  }
}

module.exports = db;
