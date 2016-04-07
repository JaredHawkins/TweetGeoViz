import * as types from '../constants/actionTypes.js';
import * as tweetsApi from '../api/tweetsApi.js';
import { MIN_QUERY_LENGTH } from '../constants/config.js';
import { showToast } from './toasterActions.js';
import { T__ } from '../reducers/language.js';

export const requestTweets = () => ({
  type: types.TWEETS_SEARCH_FETCHING
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

export const fetchTweets = (options = {}) => {
  const {
    searchQuery = '',
    startDate,
    endDate
  } = options;

  return (dispatch, getState) => {
    if (searchQuery.length < MIN_QUERY_LENGTH) {
      return dispatch(
        showToast(T__('mapPage.toaster.smallSearchString', MIN_QUERY_LENGTH))
      );
    }

    // check if we just did the same search before
    if (!shouldFetchTweets(getState(), searchQuery)) {
      return Promise.resolve();
    }

    dispatch(requestTweets());
    dispatch(showToast('Searching...'));

    tweetsApi
      .getTweets(searchQuery)
      .then(json => {
        dispatch(receiveTweets(searchQuery, json.features, json.uuid));
        dispatch(
          showToast(T__('mapPage.toaster.foundTweets', json.features.length))
        );
      })
      .catch(error => dispatch(showToast(error)));
  };
};
