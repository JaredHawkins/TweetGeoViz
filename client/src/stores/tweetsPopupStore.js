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
    };

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
  }
});

TweetsPopupStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.SHOW_POPUP:
      _visible = true;
      _point = action.point;
      TweetsPopupStore.emitChange();
      break;
    case ActionTypes.HIDE_POPUP:
      _visible = false;
      _point = {
        x: -100,
        y: -100
      };
      TweetsPopupStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = TweetsPopupStore;
