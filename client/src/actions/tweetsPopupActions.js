'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js');

var InitializeActions = {
  showPopup: function(point) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SHOW_POPUP,
      point: point
    });
  },

  hidePopup: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.HIDE_POPUP
    });
  }
};

module.exports = InitializeActions;
