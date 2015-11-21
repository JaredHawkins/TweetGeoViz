'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    request = require('request'),
    params = require('query-params'),
    apiConfig = require('../config/config.json').api;

var TweetsActions = {
  changeValue: function(name, value) {
    Dispatcher.dispatch({
      actionType: ActionTypes.TWEETS_CHANGE_VALUE,
      name: name,
      value: value
    });
  },

  search: function(query) {
    if (query.length < 3) {
      return;
    }

    var callback = function(error, response, body) {
      if (error) {
        Dispatcher.dispatch({
          actionType: ActionTypes.ERROR,
          error: 'Mongo Error :' + error
        });

        return;
      }

      Dispatcher.dispatch({
        actionType: ActionTypes.TWEETS_SEARCH,
        tweets: body.features
      });
    };

    request({
      method: 'get',
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.urls.tweets + '?' + params.encode({ search: query }),
      timeout: apiConfig.timeout,
      headers: {
        'x-access-token': apiConfig.xAccessToken
      },
      json: true,
      gzip: true
    }, callback);
  }
};

module.exports = TweetsActions;
