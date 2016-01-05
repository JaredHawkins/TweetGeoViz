'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _data = {
  searchQuery: ''
};

var SearchBarStore = assign({}, EventEmitter.prototype, {
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

SearchBarStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.SEARCHBAR_CHANGE_VALUE:

      _data[action.name] = action.value;

      SearchBarStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = SearchBarStore;
