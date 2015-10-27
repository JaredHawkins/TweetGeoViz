'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js');

var MapActions = {
  onClick: function(data) {
    Dispatcher.dispatch({
      actionType: ActionTypes.MAP_CLICK,
      point: data.point,
      lat: data.lat,
      lng: data.lng
    });
  }
};

module.exports = MapActions;
