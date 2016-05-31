/* global google */

import * as types from '../constants/actionTypes.js';

const initialState = {
  uuid: undefined,
  isSearching: false,
  tweets: [],
  selectedTweets: [],
  searchString: ''
};

function getTweetsHTML(tweets, searchString) {
  let result = [];
  const keywords = searchString.split(','); // split searchString

  return tweets.map(tweet => {
    const { text } = tweet;
    let textHTML;
    // highlighting matched keywords
    for (let i = 0; i < keywords.length; i++) {
      const regex = new RegExp(keywords[i].trim(), 'ig');
      textHTML = text.replace(regex, '<mark>$&</mark>');
    }

    return {
      ...tweet,
      textHTML
    };
  });
}

export default function tweets(state = initialState, action) {
  switch (action.type) {
    case types.TWEETS_SEARCH_FETCHING:
      return {
        ...state,
        isSearching: true
      };
    case types.TWEETS_SEARCH_FINISHED:
      return {
        tweets: action.tweets,
        searchString: action.searchString,
        uuid: action.uuid,
        selectedTweets: [],
        isSearching: false
      };
    case types.MAP_CLICK:
      return {
        ...state,
        selectedTweets: getTweetsHTML(action.selectedTweets, state.searchString)
      };
    default:
      // nothing to do
      return state;
  }
}
