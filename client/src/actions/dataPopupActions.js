'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js');
var ActionTypes = require('../constants/actionTypes.js');

var DataPopupActions = {
  changeValue: function(name, value) {
    Dispatcher.dispatch({
      actionType: ActionTypes.POPUP_CHANGE_VALUE,
      name: name,
      value: value
    });
  },

  close: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.CLOSE_POPUP
    });
  }
};

module.exports = DataPopupActions;
