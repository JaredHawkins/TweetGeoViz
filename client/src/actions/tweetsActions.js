import Dispatcher from '../dispatcher/appDispatcher.js';
const dispatch = Dispatcher.dispatch.bind(Dispatcher);
import request from 'superagent';
import params from 'query-params';
import { api as apiConfig } from '../config/config.json';
import {
  TWEETS_CHANGE_VALUE,
  PAGE_ERROR,
  TWEETS_SEARCH
} from '../constants/actionTypes.js';

export function changeValue(name, value) {
  dispatch({
    type: TWEETS_CHANGE_VALUE,
    name,
    value
  });
};

export function search(searchQuery = '') {
  if (searchQuery.length < 3) {
    dispatch({
      type: PAGE_ERROR,
      error: 'Search query is too small'
    });

    return;
  }

  let callback = (error, response) => {
    if (error) {
      dispatch({
        type: PAGE_ERROR,
        error: `Mongo Error :${error}`
      });

      return;
    }

    const {
      uuid,
      features
    } = response.body;

    dispatch({
      type: TWEETS_SEARCH,
      searchQuery: searchQuery,
      searchUUID: uuid,
      tweets: features
    });
  };

  const url = apiConfig.baseUrl + apiConfig.urls.tweets + '?' +
    params.encode({ search: searchQuery });

  request.get(url)
    .timeout(apiConfig.timeout)
    .set('x-access-token', apiConfig.xAccessToken)
    .end(callback);
};

export default {
  changeValue,
  search
};
