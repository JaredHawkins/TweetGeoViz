import * as types from '../constants/actionTypes.js';

export const close = () => ({
  type: types.POPUP_CLOSE
});

export const show = (point) => ({
  type: types.POPUP_SHOW,
  point
});
