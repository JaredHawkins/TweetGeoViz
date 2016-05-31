import * as types from '../constants/actionTypes.js';

export const close = () => ({
  type: types.POPUP_CLOSE
});

export const show = (coordinate) => ({
  type: types.POPUP_SHOW,
  coordinate
});

export const changeValue = (name, value) => ({
  type: types.POPUP_CHANGE_VALUE,
  name,
  value
});
