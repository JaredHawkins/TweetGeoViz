var tweetsCollection = require('./models/tweets'),
    Promise = require('promise');

var tweets = {
  get: function(value) {
    if (tweetsCollection.db._readyState === 0 || tweetsCollection.db._readyState > 1) {
      return new Promise(function(resolve, reject) {
        reject(new Error('Database is not responding'));
      });
    }

    var query = {
      $text: {
        $search: '"'+value+'"' // double quotes helps to search phrases with a space
      }
    };

    return tweetsCollection.find(query).sort({ tln: 1, tlt: 1 }).exec();
  }
};

module.exports = tweets;
