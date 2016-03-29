import * as types from '../constants/actionTypes.js';
import toastr from 'toastr';

export const pageError = (error) => {
  toastr.error(error);

  return {
    type: types.PAGE_ERROR,
    error
  };
};
