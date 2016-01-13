import fetch from 'isomorphic-fetch';

import request from 'superagent';
import params from 'query-params';
import { api as apiConfig, minQueryLength } from '../config/config.json';
import * as types from '../constants/actionTypes.js';

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

function checkStatus(response) {
  const { status, statusText } = response;

  if (status >= 200 && status < 300) {
    return response;
  } else {
    let error = new Error(statusText);
    error.response = response;
    throw error;
  }
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

    const url = apiConfig.baseUrl + apiConfig.urls.tweets + '?' +
      params.encode({ search: searchQuery });

    dispatch(requestTweets(searchQuery));

    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': apiConfig.xAccessToken
      }
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(
        receiveTweets(searchQuery, json.features, json.uuid))
      )
      .catch(ex => dispatch(requestError(ex.message)));
  };
};
