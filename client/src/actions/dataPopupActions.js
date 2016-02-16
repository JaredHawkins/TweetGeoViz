import * as types from '../constants/actionTypes.js';

export function close() {
  return {
    type: types.POPUP_CLOSE
  };
};

export function show(point) {
  return {
    type: types.POPUP_SHOW,
    point
  }
};
