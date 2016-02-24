import * as types from '../constants/actionTypes.js';
import * as tweetsApi from '../api/tweetsApi.js';
import { minQueryLength } from '../config/config.json';
import { pageError } from './appActions.js';

export const requestTweets = (searchQuery) => ({
  type: types.TWEETS_SEARCH_FETCHING,
  searchQuery
});

export const receiveTweets = (searchQuery, tweets, uuid) => ({
  type: types.TWEETS_SEARCH_FINISHED,
  receivedAt: Date.now(),
  searchQuery,
  tweets,
  uuid
});

const shouldFetchTweets = (state, searchQuery) => {
  const previousSearchQuery = state.tweets.searchQuery;

  return previousSearchQuery !== searchQuery;
};

export const fetchTweets = (searchQuery) => {
  return (dispatch, getState) => {
    if (searchQuery.length <= minQueryLength) {
      return dispatch(pageError('Search query is too small.'));
    }

    // check if we just did the same search before
    if (!shouldFetchTweets(getState(), searchQuery)) {
      return Promise.resolve();
    }

    dispatch(requestTweets(searchQuery));

    tweetsApi
      .getTweets(searchQuery)
      .then(json => dispatch(
        receiveTweets(searchQuery, json.features, json.uuid))
      )
      .catch(error => dispatch(pageError(error)));
  };
};
