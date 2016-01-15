import fetch from 'isomorphic-fetch';
import params from 'query-params';
import { api as apiConfig } from '../config/config.json';
import * as types from '../constants/actionTypes.js';
import Promise from 'promise';

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

export function getTweets(searchQuery) {
  const url = apiConfig.baseUrl + apiConfig.urls.tweets + '?' +
    params.encode({ search: searchQuery });

  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': apiConfig.xAccessToken
      }
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(ex => reject(ex));
  });
};
