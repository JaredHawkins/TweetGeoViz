import * as types from '../constants/actionTypes.js';

const initialState = {
  visible: false
};

export default function slidePanel(state = initialState, action) {
  switch (action.type) {
    case types.MAP_CLICK:
      if (!state.visible) {
        return state;
      }

      return {
        ...state,
        visible: false
      };

    case types.SEARCHBAR_SEARCHQUERY_FOCUS:
      // if slide-panel was shown already then do not do anything
      if (state.visible) {
        return state;
      }

      return {
        ...state,
        visible: true
      };

    default:
      // nothing to do
      return state;
  }
}
