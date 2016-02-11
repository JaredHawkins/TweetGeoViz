import * as types from '../constants/actionTypes.js';

const initialState = {
  lpoint: {
    lat: 0,
    lng: 0
  },
  isCircleVisible: false,
  isMapClickEnabled: true,
  clickRadius: 250,
  error: undefined
};

export default function map(state = initialState, action) {
  switch(action.type) {
    case types.PAGE_NO_ERROR:
      return {
        ...state,
        error: undefined
      };

    case types.PAGE_ERROR:
      return {
        ...state,
        error: action.error
      };

    case types.MAP_CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };

    case types.MAP_CLICK:
      // if click is enabled and circle already shown - then do not do anything
      // wait until popup is closed
      if (state.isCircleVisible || !state.isMapClickEnabled) {
        return state;
      }

      // otherwise show the circle
      return {
        ...state,
        isCircleVisible: true,
        lpoint: action.lpoint
      };

    case types.SEARCHBAR_SEARCHQUERY_FOCUS:
    case types.POPUP_CLOSE:
      // if circle is already hidden - do not do anything
      if (!state.isCircleVisible) {
        return state;
      }

      // otherwise hide the circle
      return {
        ...state,
        isCircleVisible: false
      };

    default:
      // nothing to do
      return state;
  }
};
