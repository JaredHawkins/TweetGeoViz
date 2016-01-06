import Dispatcher from '../dispatcher/appDispatcher.js';
const dispatch = Dispatcher.dispatch.bind(Dispatcher);
import {
  SEARCHBAR_CHANGE_VALUE,
  SEARCHBAR_SEARCHQUERY_FOCUS
} from '../constants/actionTypes.js';

export function changeValue(name, value) {
  dispatch({
    type: SEARCHBAR_CHANGE_VALUE,
    name,
    value
  });
};

export function focus() {
  dispatch({
    type: SEARCHBAR_SEARCHQUERY_FOCUS
  });
};

export default {
  changeValue,
  focus
};
