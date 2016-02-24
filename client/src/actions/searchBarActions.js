import * as types from '../constants/actionTypes.js';

export const changeValue = (name, value) => ({
  type: types.SEARCHBAR_CHANGE_VALUE,
  name,
  value
});

export const focus = () => ({
  type: types.SEARCHBAR_SEARCHQUERY_FOCUS
});
