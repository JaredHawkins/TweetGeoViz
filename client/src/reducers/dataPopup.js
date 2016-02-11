import * as types from '../constants/actionTypes.js';

const initialState = {
  point: {
    x: undefined,
    y: undefined
  },
  visible: false
};

export default function dataPopup(state = initialState, action) {
  switch(action.type) {
    case types.POPUP_SHOW:
      // if click is enabled and popup already shown - then do not do anything
      // wait until popup is closed
      if (state.visible) {
        return state;
      }

      // otherwise show the popup
      return {
        ...state,
        visible: true,
        point: action.point
      };

    case types.SEARCHBAR_SEARCHQUERY_FOCUS:
    case types.POPUP_CLOSE:
      // if popup is already hidden - do not do anything
      if (!state.visible) {
        return state;
      }

      // otherwise hide the popup
      return {
        ...state,
        visible: false
      };

    default:
      // nothing to do
      return state;
  }
};
