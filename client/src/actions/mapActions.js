'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js');

var MapActions = {
  changeValue: function(name, value) {
    Dispatcher.dispatch({
      actionType: ActionTypes.MAP_CHANGE_VALUE,
      name: name,
      value: value
    });
  },

  click: function(options) {
    options = options || {};

    Dispatcher.dispatch({
      actionType: ActionTypes.MAP_CLICK,
      point: options.point,
      lpoint: options.lpoint,
      bounds: options.bounds
    });
  }
};

module.exports = MapActions;
