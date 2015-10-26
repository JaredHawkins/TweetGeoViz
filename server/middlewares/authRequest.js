'use strict';

/*global module, require*/

var config = require('../config/config.json');

module.exports = function(req, res, next) {

  var validateToken = function(token) {
    return config.apiKey == token;
  };

  // Do not check token if it is a ping method
  if (req.baseUrl == config.apiPrefix + config.apiVersion + config.pingUrl
        || req.baseUrl == config.apiPrefix + config.pingUrl) {
    next(); // To move to next middleware
    return;
  }

  var token = (req.body && req.body.access_token) ||
              (req.query && req.query.access_token) ||
              req.headers['x-access-token'];

  if (!token) {
    res.status(401);
    res.json({
      status: 401,
      message: 'Invalid Token'
    });
    return;
  }

  try {
    // Authorize the user to see if s/he can access our resources
    if (!validateToken(token)) {
      res.status(403);
      res.json({
        status: 403,
        message: 'Not Authorized'
      });
      return;
    }

    next(); // To move to next middleware

  } catch (err) {
    next(err); // To move to next error middleware
  }
};
