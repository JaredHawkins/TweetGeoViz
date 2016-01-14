import * as types from '../constants/actionTypes.js';

export function changeValue(name, value) {
  return {
    type: types.SEARCHBAR_CHANGE_VALUE,
    name,
    value
  };
};

export function focus() {
  return {
    type: types.SEARCHBAR_SEARCHQUERY_FOCUS
  };
};
