/* global google */

import * as types from '../constants/actionTypes.js';

const initialState = {
  uuid: undefined,
  isSearching: false,
  tweets: [],
  selectedTweets: [],
  heatmapData: [],
  searchString: ''
};

function generateHeatMap(tweets = []) {
  let heatmapData = [];

  tweets.forEach(tweet => {
    const coords = tweet.geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);
    heatmapData.push(latLng);
  });

  return heatmapData;
}

function getTweetsInBounds(state, bounds) {
  let result = [];
  const { tweets = [], searchString } = state;
  const keywords = searchString.split(','); // split searchString

  if (!bounds) {
    return;
  }

  tweets.forEach(tweet => {
    const coords = tweet.geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    if (!bounds.contains(latLng)) {
      return;
    }

    let text = tweet.text;
    // highlighting matched keywords
    for (let i = 0; i < keywords.length; i++) {
      const regex = new RegExp(keywords[i].trim(), 'ig');
      text = text.replace(regex, '<mark>$&</mark>');
    }

    result.push({
      ...tweet,
      text
    });
  });

  return result;
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
        heatMapData: generateHeatMap(action.tweets),
        selectedTweets: [],
        isSearching: false
      };

    case types.MAP_CLICK:
      // if there are no tweets at all, then do not even bother
      if (!state.tweets.length) {
        return state;
      }

      return {
        ...state,
        selectedTweets: getTweetsInBounds(state, action.bounds)
      };

    default:
      // nothing to do
      return state;
  }
}
