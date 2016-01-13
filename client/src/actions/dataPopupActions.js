import * as types from '../constants/actionTypes.js';

export function changeValue(name, value) {
  return {
    type: types.POPUP_CHANGE_VALUE,
    name,
    value
  };
};

export function close() {
  return {
    type: types.POPUP_CLOSE
  };
};
