'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var state = {
  point: {
    x: undefined,
    y: undefined
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

  getState: function() {
    return state;
  }
});

DataPopupStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.POPUP_CHANGE_VALUE:

      state = {
        ...state,
        [action.name]: action.value
      };

      DataPopupStore.emitChange();
      break;
    case ActionTypes.MAP_CLICK:
      // if click is enabled and popup already shown - then do not do anything
      // wait until popup is closed
      if (state.visible) {
        return state;
      }

      // otherwise show the popup
      state = {
        ...state,
        visible: true,
        point: action.point
      };

      DataPopupStore.emitChange();
      break;
    case ActionTypes.CLOSE_POPUP:
    case ActionTypes.SEARCHBAR_SEARCHQUERY_FOCUS:
      // if popup is already hidden - do not do anything
      if (!state.visible) {
        return state;
      }

      // otherwise hide the popup
      state = {
        ...state,
        visible: false
      };

      DataPopupStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default DataPopupStore;
