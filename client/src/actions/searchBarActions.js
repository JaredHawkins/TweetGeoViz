'use strict';

var Dispatcher = require('../dispatcher/appDispatcher.js'),
    ActionTypes = require('../constants/actionTypes.js');

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
      actionType: ActionTypes.SEARCH_ONFOCUS
    });
  }
};

module.exports = SearchBarActions;
