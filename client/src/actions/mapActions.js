import * as types from '../constants/actionTypes.js';

export function changeValue(name, value) {
  return {
    type: types.MAP_CHANGE_VALUE,
    name,
    value
  };
};

export function click(bounds, lpoint) {
  return {
    type: types.MAP_CLICK,
    bounds,
    lpoint
  };
};

export function noError() {
  return {
    type: types.PAGE_NO_ERROR
  };
};
