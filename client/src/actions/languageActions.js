import * as types from '../constants/actionTypes.js';

export function changeValue(value) {
  return {
    type: types.LANGUAGE_CHANGE_LANGUAGE,
    value
  };
};
