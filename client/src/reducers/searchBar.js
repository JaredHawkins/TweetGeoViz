import * as types from '../constants/actionTypes.js';

const initialState = {
  searchQuery: ''
};

export default function searchBar(state = initialState, action) {
  switch(action.type) {
    case types.SEARCHBAR_CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };

    default:
      // nothing to do
      return state;
  }
};
