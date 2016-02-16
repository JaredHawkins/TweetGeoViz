import * as types from '../constants/actionTypes.js';
import { minQueryLength } from '../config/config.json';
import { getTweets } from '../api/tweets.js';

function requestTweets(searchQuery) {
  return {
    type: types.TWEETS_REQUEST_TWEETS,
    searchQuery
  };
};

function receiveTweets(searchQuery, tweets, uuid) {
  return {
    type: types.TWEETS_RECEIVE_TWEETS,
    receivedAt: Date.now(),
    searchQuery,
    tweets,
    uuid
  };
};

function requestError(error) {
  return {
    type: types.PAGE_ERROR,
    error
  };
};

function shouldFetchTweets(state, searchQuery) {
  const previousSearchQuery = state.tweets.searchQuery;

  return previousSearchQuery !== searchQuery;
};

export function fetchTweets(searchQuery) {
  if (searchQuery.length <= minQueryLength) {
    return requestError('Search query is too small.');
  }

  return (dispatch, getState) => {
    // check if we just did the same search before
    if (!shouldFetchTweets(getState(), searchQuery)) {
      return Promise.resolve();
    }

    dispatch(requestTweets(searchQuery));

    getTweets(searchQuery)
      .then(json => dispatch(
        receiveTweets(searchQuery, json.features, json.uuid))
      )
      .catch(error => dispatch(requestError(errorMessage)));
  };
};
