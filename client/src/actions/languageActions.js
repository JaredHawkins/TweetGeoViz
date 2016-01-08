import Dispatcher from '../dispatcher/appDispatcher.js';
const dispatch = Dispatcher.dispatch.bind(Dispatcher);
import { LANGUAGE_CHANGE_LANGUAGE } from '../constants/actionTypes';

export function changeValue(value) {
  value = parseInt(value, 10);

  dispatch({
    actionType: LANGUAGE_CHANGE_LANGUAGE,
    value
  });
};

export default {
  changeValue
};
