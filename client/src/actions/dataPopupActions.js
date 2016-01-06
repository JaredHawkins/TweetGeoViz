import Dispatcher from '../dispatcher/appDispatcher.js';
const dispatch = Dispatcher.dispatch.bind(Dispatcher);
import {
  POPUP_CHANGE_VALUE,
  CLOSE_POPUP
} from '../constants/actionTypes.js';

export function changeValue(name, value) {
  dispatch({
    type: POPUP_CHANGE_VALUE,
    name,
    value
  });
};

export function close() {
  dispatch({
    type: CLOSE_POPUP
  });
};

export default {
  changeValue,
  close
};
