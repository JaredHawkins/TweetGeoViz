'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _tweets = [];

var TweetsStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getTweets: function() {
    return _tweets;
  },

  getTweetsInBounds: function(bounds) {
    var tweets = [];

    for (var i = 0, len = _tweets.length; i < len; i++) {
      var tweet = _tweets[i],
          coords = tweet.geometry.coordinates,
          latLng = new google.maps.LatLng(coords[1], coords[0]);

      if (bounds.contains(latLng)) {
        tweets.push(tweet);
      }
    }

    return tweets;
  }
});

TweetsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.TWEETS_SEARCH:
      _tweets = action.tweets;
      TweetsStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = TweetsStore;
