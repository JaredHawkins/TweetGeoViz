'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _point = {
  left: -100,
  right: -100
};

var _visible = false;

var DataPopupStore = assign({}, EventEmitter.prototype, {
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
  }
});

DataPopupStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.MAP_CLICK:
      if (_visible) {
        return;
      }

      if (!action.showPopupOnClick) {
        return;
      }

      _visible = true;
      _point = action.point;

      DataPopupStore.emitChange();
      break;
    case ActionTypes.CLOSE_POPUP:
    case ActionTypes.SEARCH_ONFOCUS:
      if (!_visible) {
        return;
      }

      _visible = false;

      DataPopupStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = DataPopupStore;
