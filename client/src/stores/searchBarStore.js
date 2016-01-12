import _ from 'lodash';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import Dispatcher, { CHANGE_EVENT } from '../dispatcher/appDispatcher.js';
import {
  SEARCHBAR_CHANGE_VALUE
} from '../constants/actionTypes.js';

let state = {
  searchQuery: ''
};

let SearchBarStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getState: function() {
    return state;
  }
});

SearchBarStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case SEARCHBAR_CHANGE_VALUE:

      state = {
        ...state,
        [action.name]: action.value
      };

      SearchBarStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default SearchBarStore;
