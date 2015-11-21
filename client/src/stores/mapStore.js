'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    _ = require('lodash'),
    CHANGE_EVENT = 'change';

var _data = {
  lpoint: {
    lat: 0,
    lng: 0
  },
  isCircleVisible: false,
  clickRadius: 250
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

  getData: function() {
    return _data;
  }

});

MapStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.MAP_CHANGE_VALUE:

      _data[action.name] = action.value;

      MapStore.emitChange();
      break;
    case ActionTypes.MAP_CLICK:

      // if click is disabled and we show circle - hide it
      if (!action.showPopupOnClick && _data.isCircleVisible) {
        _data.isCircleVisible = false;

        return MapStore.emitChange();
      }

      // if click is enabled and circle already shown - then do not do anything
      // wait until popup is closed
      if (_data.isCircleVisible) {
        return;
      }

      // otherwise show the circle
      _data.isCircleVisible = true;
      _data.lpoint = action.point;

      MapStore.emitChange();
      break;
    case ActionTypes.CLOSE_POPUP:

      // if circle is already hidden - do not do anything
      if (!_data.isCircleVisible) {
        return;
      }

      // otherwise hide the circle
      _data.isCircleVisible = false;

      MapStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

module.exports = MapStore;
