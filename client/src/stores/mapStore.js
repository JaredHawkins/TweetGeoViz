'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _lpoint = {
  lat: 0,
  lng: 0
};

var _isCircleVisible = false;

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

  isCircleVisible: function() {
    return _isCircleVisible;
  },

  getLPoint: function() {
    return _lpoint;
  }
});

MapStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.MAP_CLICK:
      if (_isCircleVisible) {
        return;
      }

      if (!action.showPopupOnClick) {
        return;
      }

      _isCircleVisible = true;
      _lpoint = action.lpoint;

      MapStore.emitChange();
      break;
    case ActionTypes.CLOSE_POPUP:
    case ActionTypes.SEARCH_ONFOCUS:
      if (!_isCircleVisible) {
        return;
      }

      _isCircleVisible = false;

      MapStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = MapStore;
