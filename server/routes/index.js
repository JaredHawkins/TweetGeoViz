/*global module, require*/

// var express = require('express'),
//     router = express.Router();

// Landing page
// router.get('/', function(req, res) {
//   var emptyBlob = {
//     features: []
//   };

//   res.render('demo.jade', {
//     pins: JSON.stringify(emptyBlob),
//     searchQuery: JSON.stringify(null)
//   });
// });

// // Adding extra routes here
// require('./search.js')(router);

// module.exports = router;



'use strict';

/* global module, require */

var express = require('express'),
    router = express.Router(),
    config = require('../config/config.json'),
    tweets = require('./tweets.js');

var ping = function(req, res) {
  res.json({
    message: 'pong'
  });
};

router.get(config.pingUrl, ping);

//Tweets///////////////////////////////////
router.get('/tweets', tweets.get);
///////////////////////////////////////////

module.exports = router;
