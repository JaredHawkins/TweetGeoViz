import * as types from '../constants/actionTypes.js';

export const changeValue = (name, value) => ({
  type: types.NAVBAR_CHANGE_VALUE,
  name,
  value
});

export const focus = () => ({
  type: types.NAVBAR_SEARCHSTRING_FOCUS
});
