'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js');

var MapActions = {
  click: function(options) {
    options = options || {};

    Dispatcher.dispatch({
      actionType: ActionTypes.MAP_CLICK,
      point: options.point,
      lpoint: options.lpoint,
      showPopupOnClick: options.showPopupOnClick
    });
  }
};

module.exports = MapActions;
