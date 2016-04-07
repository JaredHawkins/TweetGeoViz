import { combineReducers } from 'redux';

import dataPopup from './dataPopup.js';
import slidePanel from './slidePanel.js';
import navBar from './navBar.js';
import map from './map.js';
import tweets from './tweets.js';
import toaster from './toaster.js';
import language from './language.js';

import { routeReducer } from 'react-router-redux';

export default combineReducers({
  dataPopup,
  slidePanel,
  navBar,
  map,
  tweets,
  toaster,
  language,

  routing: routeReducer
});
