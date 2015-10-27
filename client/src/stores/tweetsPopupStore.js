'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _visible = false,
    _point = {
      x: -100,
      y: -100
    },
    _lat = null,
    _lng = null;

var TweetsPopupStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  isVisible: function() {
    return _visible;
  },

  getPoint: function() {
    return _point;
  },

  getLat: function() {
    return _lat;
  },

  getLng: function() {
    return _lng;
  }
});

TweetsPopupStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.MAP_CLICK:
      if (_visible) {
        return;
      }

      _visible = true;
      _point = action.point;
      _lat = action.lat;
      _lng = action.lng;
      TweetsPopupStore.emitChange();
      break;
    case ActionTypes.CLOSE_POPUP:
      if (!_visible) {
        return;
      }

      _visible = false;
      _point = {
        x: -100,
        y: -100
      };
      _lat = null;
      _lng = null;
      TweetsPopupStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = TweetsPopupStore;
