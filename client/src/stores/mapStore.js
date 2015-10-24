'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _clickRadius = 250,
    _mapClickEnabled = true;

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

  getClickRadiusMeters: function() {
    var km = 1000;
    return _clickRadius * km;
  }
});

MapStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    default:
      // nothing to do
      break;
  }
});

module.exports = MapStore;
