'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js');

var MapActions = {
  onClick: function(point) {
    Dispatcher.dispatch({
      actionType: ActionTypes.MAP_CLICK,
      point: point
    });
  }
};

module.exports = MapActions;
