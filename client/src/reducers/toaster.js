import * as types from '../constants/actionTypes.js';
import { TOASTER_DURATION } from '../constants/config.js';

const initialState = {
  visible: false,
  message: '',
  duration: TOASTER_DURATION
};

export default function toaster(state = initialState, action) {
  switch (action.type) {
    case types.TOASTER_CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };
    case types.PAGE_ERROR:
      return {
        visible: true,
        message: action.errorMessage,
        duration: action.duration || TOASTER_DURATION
      };
    default:
      // nothing to do
      return state;
  }
}
