'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _data = {
  point: {
    left: undefined,
    right: undefined
  },
  visible: false,
  showPopupOnClick: true
};

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

  getData: function() {
    return _data;
  }
});

DataPopupStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.POPUP_CHANGE_VALUE:

      _data[action.name] = action.value;

      DataPopupStore.emitChange();
      break;
    case ActionTypes.MAP_CLICK:
      // if click is enabled and popup already shown - then do not do anything
      // wait until popup is closed
      if (_data.visible) {
        return;
      }

      // otherwise show the popup
      _data.visible = true;
      _data.point = action.point;

      DataPopupStore.emitChange();
      break;
    case ActionTypes.CLOSE_POPUP:
    case ActionTypes.SEARCH_ONFOCUS:
      // if popup is already hidden - do not do anything
      if (!_data.visible) {
        return;
      }

      // otherwise hide the popup
      _data.visible = false;

      DataPopupStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = DataPopupStore;
