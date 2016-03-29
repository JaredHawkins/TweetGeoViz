import * as types from '../constants/actionTypes.js';

export const changeValue = (name, value) => ({
  type: types.MAP_CHANGE_VALUE,
  name,
  value
});

export const click = (bounds, lpoint) => ({
  type: types.MAP_CLICK,
  bounds,
  lpoint
});
