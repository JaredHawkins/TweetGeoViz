import * as types from '../constants/actionTypes.js';
import * as tweetsApi from '../api/tweetsApi.js';
import { MIN_QUERY_LENGTH } from '../constants/config.js';
import { showToast } from './toasterActions.js';
import { T__ } from '../reducers/language.js';

export const requestTweets = () => ({
  type: types.TWEETS_SEARCH_FETCHING
});

export const receiveTweets = (searchString, tweets, uuid) => ({
  type: types.TWEETS_SEARCH_FINISHED,
  receivedAt: Date.now(),
  searchString,
  tweets,
  uuid
});

const shouldFetchTweets = (state, searchString) => {
  const previousSearchString = state.tweets.searchString;

  return previousSearchString !== searchString;
};

export const fetchTweets = (options = {}) => {
  const {
    searchString = '',
    startDate,
    endDate
  } = options;

  return (dispatch, getState) => {
    if (searchString.length < MIN_QUERY_LENGTH) {
      return dispatch(
        showToast(T__('mapPage.toaster.smallSearchString', MIN_QUERY_LENGTH))
      );
    }

    // check if we just did the same search before
    if (!shouldFetchTweets(getState(), searchString)) {
      return Promise.resolve();
    }

    dispatch(requestTweets());
    dispatch(showToast('Searching...'));

    tweetsApi
      .getTweets(searchString)
      .then((result = {}) => {
        const { geoJSON, uuid } = result;
        dispatch(receiveTweets(searchString, geoJSON, uuid));
        dispatch(
          showToast(T__('mapPage.toaster.foundTweets', geoJSON.features.length))
        );
      })
      .catch(error => dispatch(showToast(error)));
  };
};
