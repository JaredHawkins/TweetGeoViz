'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js');
var ActionTypes = require('../constants/actionTypes.js');

var SlidePanelActions = {
  hide: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.SLIDEPANEL_HIDE
    });
  }
};

module.exports = SlidePanelActions;
