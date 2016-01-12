import _ from 'lodash';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import Dispatcher, { CHANGE_EVENT } from '../dispatcher/appDispatcher.js';
import {
  SLIDEPANEL_HIDE,
  SEARCHBAR_SEARCHQUERY_FOCUS
} from '../constants/actionTypes.js';

let state = {
  visible: false
};

let SlidePanelStore = assign({}, EventEmitter.prototype, {
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

SlidePanelStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case SLIDEPANEL_HIDE:
      // if slide-panel was hidden already then do not do anything
      if (!state.visible) {
        return state;
      }

      state = {
        ...state,
        visible: false
      };

      SlidePanelStore.emitChange();
      break;
    case SEARCHBAR_SEARCHQUERY_FOCUS:

      // if slide-panel was shown already then do not do anything
      if (state.visible) {
        return state;
      }

      state = {
        ...state,
        visible: true
      };

      SlidePanelStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default SlidePanelStore;
