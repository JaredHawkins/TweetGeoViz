'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _isSlidePanelVisible = false;

var SlidePanelStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  isSlidePanelVisible: function() {
    return _isSlidePanelVisible;
  }
});

SlidePanelStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.SEARCH_ONFOCUS:
      if (_isSlidePanelVisible) {
        return;
      }

      _isSlidePanelVisible = true;
      SlidePanelStore.emitChange();
      break;
    case ActionTypes.MAP_CLICK:
      if (!_isSlidePanelVisible) {
        return;
      }

      _isSlidePanelVisible = false;
      SlidePanelStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = SlidePanelStore;
