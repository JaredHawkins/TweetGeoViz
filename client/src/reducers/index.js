import { combineReducers } from 'redux';

import dataPopup from './dataPopup.js';
import slidePanel from './slidePanel.js';
import searchBar from './searchBar.js';
import map from './map.js';
import tweets from './tweets.js';
import language from './language.js';

import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  dataPopup,
  slidePanel,
  searchBar,
  map,
  tweets,
  language,

  routing: routeReducer
});