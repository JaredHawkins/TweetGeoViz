import * as types from '../constants/actionTypes.js';

const initialState = {
  coordinate: [0, 0],
  visible: false,
  filterText: '',
  showFilter: true,
  showTimeStamps: true
};

export default function dataPopup(state = initialState, action) {
  switch (action.type) {
    case types.POPUP_CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };
    case types.POPUP_SHOW:
      // if click is enabled and popup already shown - then do not do anything
      // wait until popup is closed
      if (state.visible) {
        return state;
      }

      // otherwise show the popup
      return {
        ...state,
        filterText: '',
        visible: true,
        coordinate: action.coordinate
      };
    case types.SLIDEPANEL_SHOW:
    case types.NAVBAR_SEARCHSTRING_FOCUS:
    case types.POPUP_CLOSE:
      // if popup is already hidden - do not do anything
      if (!state.visible) {
        return state;
      }

      // otherwise hide the popup
      return {
        ...state,
        filterText: '',
        visible: false
      };
    default:
      // nothing to do
      return state;
  }
}
