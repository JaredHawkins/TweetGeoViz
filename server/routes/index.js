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
