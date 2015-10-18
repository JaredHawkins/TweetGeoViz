'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js');

var InitializeActions = {
  initApp: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.INITIALIZE,
      initialData: {}
    });
  }
};

module.exports = InitializeActions;
