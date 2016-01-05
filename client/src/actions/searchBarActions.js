'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js');
var ActionTypes = require('../constants/actionTypes.js');

var SearchBarActions = {
  changeValue: function(name, value) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SEARCHBAR_CHANGE_VALUE,
      name: name,
      value: value
    });
  },

  focus: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.SEARCHBAR_SEARCHQUERY_FOCUS
    });
  }
};

module.exports = SearchBarActions;
