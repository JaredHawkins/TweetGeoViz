import * as types from '../constants/actionTypes.js';
import { UPDATE_LOCATION } from 'react-router-redux';

const initialState = {
  searchString: '',
  showAdvanced: false,
  startDate: undefined,
  endDate: undefined
};

export default function searchBar(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      const { query = {} } = action.payload;
      const {
        searchString,
        startDate,
        endDate
      } = query;

      const showAdvanced = startDate && endDate;

      return {
        ...state,
        searchString,
        showAdvanced,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined
      };
    case types.NAVBAR_CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };
    default:
      // nothing to do
      return state;
  }
}
