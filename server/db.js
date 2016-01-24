var mongoose = require('mongoose'),
    config = require('./config/config.json').mongo;

var db = {
  /**
   * Connect to mongodb
   *
   */
  connect: function() {
    mongoose.connect(config.server + config.databaseName, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('connected to mongodb');
      }
    });
  }
}

module.exports = db;
