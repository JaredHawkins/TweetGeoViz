import * as types from '../constants/actionTypes.js';

export function changeValue(name, value) {
  return {
    type: types.MAP_CHANGE_VALUE,
    name,
    value
  };
};

export function click(options = {}) {
  return {
    type: types.MAP_CLICK,
    point: options.point,
    lpoint: options.lpoint,
    bounds: options.bounds
  };
};

export function noError() {
  return {
    type: types.PAGE_NO_ERROR
  };
};
