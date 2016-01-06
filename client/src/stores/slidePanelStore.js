'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var state = {
  visible: false
};

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

  getState: function() {
    return state;
  }
});

SlidePanelStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SLIDEPANEL_HIDE:
      // if slide-panel was hidden already then do not do anything
      if (!state.visible) {
        return state;
      }

      state = {
        ...state,
        visible: false
      };

      SlidePanelStore.emitChange();
      break;
    case ActionTypes.SEARCHBAR_SEARCHQUERY_FOCUS:

      // if slide-panel was shown already then do not do anything
      if (state.visible) {
        return state;
      }

      state = {
        ...state,
        visible: true
      };

      SlidePanelStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default SlidePanelStore;
