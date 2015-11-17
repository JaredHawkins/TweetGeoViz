'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _tweets = [],
    _selectedTweets = [],
    _heatMapData = [];

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

  getSelectedTweets: function() {
    return _selectedTweets;
  },

  getHeatMapData: function() {
    return _heatMapData;
  },

  _generateHeatMap: function(data) {
    data = data || [];

    var heatmapData = [];

    data.forEach(function(pin) {
      var coords = pin.geometry.coordinates,
          latLng = new google.maps.LatLng(coords[1], coords[0]);
      heatmapData.push(latLng);
    });

    return heatmapData;
  },

  getTweetsInBounds: function(bounds, searchQuery) {
    var result = [];
    var regex = new RegExp(searchQuery, 'ig');

    if (!bounds) {
      return;
    }

    _tweets.forEach(function(tweet) {
      var coords = tweet.geometry.coordinates,
          latLng = new google.maps.LatLng(coords[1], coords[0]);

      if (bounds.contains(latLng)) {
        tweet.text = tweet.text.replace(regex,
          '<span class="selection">$&</span>');
        result.push(tweet);
      }
    });

    return result;
  }
});

TweetsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.TWEETS_SEARCH:
      _tweets = action.tweets;

      _heatMapData = TweetsStore._generateHeatMap(_tweets);

      TweetsStore.emitChange();
      break;
    case ActionTypes.MAP_CLICK:
      _selectedTweets = TweetsStore.getTweetsInBounds(action.bounds,
        action.searchQuery);

      TweetsStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = TweetsStore;
