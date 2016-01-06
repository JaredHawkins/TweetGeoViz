'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var state = {
  lpoint: {
    lat: 0,
    lng: 0
  },
  isCircleVisible: false,
  isMapClickEnabled: true,
  clickRadius: 250,
  error: undefined
};

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

  getState: function() {
    return state;
  }

});

MapStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.PAGE_ERROR:

      state = {
        ...state,
        error: action.error
      };

      MapStore.emitChange();
      break;
    case ActionTypes.MAP_CHANGE_VALUE:

      state = {
        ...state,
        [action.name]: action.value
      };

      MapStore.emitChange();
      break;
    case ActionTypes.MAP_CLICK:

      // if click is enabled and circle already shown - then do not do anything
      // wait until popup is closed
      if (state.isCircleVisible) {
        return state;
      }

      // otherwise show the circle
      state = {
        ...state,
        isCircleVisible: true,
        lpoint: action.lpoint
      };

      MapStore.emitChange();
      break;
    case ActionTypes.SEARCHBAR_SEARCHQUERY_FOCUS:
    case ActionTypes.CLOSE_POPUP:

      // if circle is already hidden - do not do anything
      if (!state.isCircleVisible) {
        return state;
      }

      // otherwise hide the circle
      state = {
        ...state,
        isCircleVisible: false
      };

      MapStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default MapStore;
