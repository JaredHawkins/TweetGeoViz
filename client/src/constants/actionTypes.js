'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
  // init
  INITIALIZE: null,

  // map
  MAP_CLICK: null,
  MAP_CHANGE_VALUE: null,

  // searchBar
  SEARCHBAR_SEARCHQUERY_FOCUS: null,
  SEARCHBAR_CHANGE_VALUE: null,

  // tweetsPopup
  POPUP_CLOSE: null,
  POPUP_CHANGE_VALUE: null,

  // slidePanel
  SLIDEPANEL_CHANGE_VALUE: null,
  SLIDEPANEL_HIDE: null,

  // tweets
  TWEETS_SEARCH: null,
  TWEETS_CHANGE_VALUE: null,

  // errors
  PAGE_ERROR: null
});
