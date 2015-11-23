'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js');
var ActionTypes = require('../constants/actionTypes.js');
var request = require('request');
var params = require('query-params');
var apiConfig = require('../config/config.json').api;

var TweetsActions = {
  changeValue: function(name, value) {
    Dispatcher.dispatch({
      actionType: ActionTypes.TWEETS_CHANGE_VALUE,
      name: name,
      value: value
    });
  },

  search: function(searchQuery) {
    if (searchQuery.length < 3) {
      return;
    }

    var callback = function(error, response, body) {
      if (error) {
        Dispatcher.dispatch({
          actionType: ActionTypes.PAGE_ERROR,
          error: 'Mongo Error :' + error
        });

        return;
      }

      Dispatcher.dispatch({
        actionType: ActionTypes.TWEETS_SEARCH,
        searchQuery: searchQuery,
        searchUUID: body.uuid,
        tweets: body.features
      });
    };

    request({
      method: 'get',
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.urls.tweets + '?' + params.encode({ search: searchQuery }),
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
