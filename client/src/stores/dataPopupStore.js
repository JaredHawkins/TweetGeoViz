import _ from 'lodash';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import Dispatcher, { CHANGE_EVENT } from '../dispatcher/appDispatcher.js';
import {
  POPUP_CHANGE_VALUE,
  MAP_CLICK,
  CLOSE_POPUP,
  SEARCHBAR_SEARCHQUERY_FOCUS
} from '../constants/actionTypes.js';

let state = {
  point: {
    x: undefined,
    y: undefined
  },
  visible: false,
  showPopupOnClick: true
};

let DataPopupStore = assign({}, EventEmitter.prototype, {
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

DataPopupStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case POPUP_CHANGE_VALUE:

      state = {
        ...state,
        [action.name]: action.value
      };

      DataPopupStore.emitChange();
      break;
    case MAP_CLICK:
      // if click is enabled and popup already shown - then do not do anything
      // wait until popup is closed
      if (state.visible) {
        return state;
      }

      // otherwise show the popup
      state = {
        ...state,
        visible: true,
        point: action.point
      };

      DataPopupStore.emitChange();
      break;
    case CLOSE_POPUP:
    case SEARCHBAR_SEARCHQUERY_FOCUS:
      // if popup is already hidden - do not do anything
      if (!state.visible) {
        return state;
      }

      // otherwise hide the popup
      state = {
        ...state,
        visible: false
      };

      DataPopupStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default DataPopupStore;
