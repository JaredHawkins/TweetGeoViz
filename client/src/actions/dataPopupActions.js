import * as types from '../constants/actionTypes.js';

export const close = () => ({
  type: types.POPUP_CLOSE
});

export const show = (pixel) => ({
  type: types.POPUP_SHOW,
  pixel
});

export const changeValue = (name, value) => ({
  type: types.POPUP_CHANGE_VALUE,
  name,
  value
});
