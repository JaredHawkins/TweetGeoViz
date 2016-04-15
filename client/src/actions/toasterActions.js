import * as types from '../constants/actionTypes.js';

export const changeValue = (name, value) => ({
  type: types.TOASTER_CHANGE_VALUE,
  name,
  value
});

export const showToast = (errorMessage, duration) => ({
  type: types.PAGE_ERROR,
  errorMessage,
  duration
});
