import * as types from '../constants/actionTypes.js';

const initialState = { visible: false };

export default function slidePanel(state = initialState, action) {
  switch (action.type) {
    case types.NAVBAR_SEARCHSTRING_FOCUS:
    case types.MAP_CLICK:
      return {
        ...state,
        visible: false
      };
    case types.SLIDEPANEL_SHOW:
      return {
        ...state,
        visible: true
      };
    default:
      // nothing to do
      return state;
  }
}
