import _ from 'lodash';
import assign from 'object-assign';
import { EventEmitter } from 'events';
import Dispatcher, { CHANGE_EVENT } from '../dispatcher/appDispatcher.js';
import {
  PAGE_ERROR,
  MAP_CHANGE_VALUE,
  MAP_CLICK,
  SEARCHBAR_SEARCHQUERY_FOCUS,
  CLOSE_POPUP
} from '../constants/actionTypes.js';

let state = {
  lpoint: {
    lat: 0,
    lng: 0
  },
  isCircleVisible: false,
  isMapClickEnabled: true,
  clickRadius: 250,
  error: undefined
};

let MapStore = assign({}, EventEmitter.prototype, {
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

MapStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case PAGE_ERROR:

      state = {
        ...state,
        error: action.error
      };

      MapStore.emitChange();
      break;
    case MAP_CHANGE_VALUE:

      state = {
        ...state,
        [action.name]: action.value
      };

      MapStore.emitChange();
      break;
    case MAP_CLICK:

      // if click is enabled and circle already shown - then do not do anything
      // wait until popup is closed
      if (state.isCircleVisible) {
        return state;
      }

      // otherwise show the circle
      state = {
        ...state,
        isCircleVisible: true,
        lpoint: action.lpoint
      };

      MapStore.emitChange();
      break;
    case SEARCHBAR_SEARCHQUERY_FOCUS:
    case CLOSE_POPUP:

      // if circle is already hidden - do not do anything
      if (!state.isCircleVisible) {
        return state;
      }

      // otherwise hide the circle
      state = {
        ...state,
        isCircleVisible: false
      };

      MapStore.emitChange();
      break;
    default:
      // nothing to do
      break;
  }
});

export default MapStore;
