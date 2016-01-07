'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var state = {
  searchUUID: undefined,
  tweets: [],
  selectedTweets: [],
  heatmapData: [],
  searchQuery: ''
};

function generateHeatMap(tweets = []) {
  let heatmapData = [];

  tweets.forEach(tweet => {
    const coords = tweet.geometry.coordinates;
    let latLng = new google.maps.LatLng(coords[1], coords[0]);
    heatmapData.push(latLng);
  });

  return heatmapData;
};

function getTweetsInBounds(state, bounds) {
  let result = [];
  const { tweets = [], searchQuery } = state;
  const keywords = searchQuery.split(','); // split searchQuery

  if (!bounds) {
    return;
  }

  tweets.forEach(tweet => {
    const coords = tweet.geometry.coordinates;
    let latLng = new google.maps.LatLng(coords[1], coords[0]);

    if (bounds.contains(latLng)) {
      let text = tweet.text;
      // highlighting matched keywords
      for (let i = 0; i < keywords.length; i++) {
        let regex = new RegExp(keywords[i].trim(), 'ig');
        text = text.replace(regex, '<mark>$&</mark>');
      }

      tweet.text = text
      result.push(tweet);
    }
  });

  return result;
};

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

  getState: function() {
    return state;
  }
});

TweetsStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.TWEETS_CHANGE_VALUE:

      state = {
        ...state,
        [action.name]: action.value
      };

      TweetsStore.emitChange();

      break;
    case ActionTypes.TWEETS_SEARCH:
      state = {
        tweets: action.tweets,
        searchQuery: action.searchQuery,
        searchUUID: action.searchUUID,
        heatMapData: generateHeatMap(action.tweets),
        selectedTweets: []
      };

      TweetsStore.emitChange();
      break;
    case ActionTypes.MAP_CLICK:

      // if there are no tweets at all, then do not even bother
      if (!state.tweets.length) {
        return state;
      }

      state = {
        ...state,
        selectedTweets: getTweetsInBounds(state, action.bounds)
      };

      TweetsStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default TweetsStore;
