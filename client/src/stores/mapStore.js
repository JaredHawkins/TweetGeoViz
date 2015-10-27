'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _error = null,
    _heatMapData = [],
    _searchQuery = '';

var MapStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getError: function() {
    return _error;
  },

  getHeatMapData: function() {
    return _heatMapData;
  },

  getSearchQuery: function() {
    return _searchQuery;
  }

});

MapStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.ERROR:
      _error = action.error;
      MapStore.emitChange();
      break;
    case ActionTypes.TWEETS_SEARCH:
      _heatMapData = [];

      for (var i = 0, len = action.tweets.length; i < len; ++i) {
        var item = action.tweets[i],
            coords = item.geometry.coordinates,
            latLng = new google.maps.LatLng(coords[1], coords[0]);
        _heatMapData.push(latLng);
      }

      MapStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = MapStore;
