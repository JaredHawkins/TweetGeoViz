import request from 'superagent';
import { api as apiConfig } from '../config/config.json';
import Promise from 'promise';

const {
  urls,
  timeout,
  xAccessToken
} = apiConfig;

function createRequest(options = {}) {
  const {
    url,
    body = {},
    query = {},
    method = 'get'
  } = options;

  return new Promise((resolve, reject) => {
    request[method](urls.base + url)
      .timeout(timeout)
      .set('x-access-token', xAccessToken)
      .query(query)
      .send(body)
      .end((error, response = {}) => {
        if (error) {
          reject(error);
        }

        resolve(response.body);
      });
  });
}

export function getTweets(searchQuery) {
  return createRequest({
    url: urls.tweets,
    query: { search: searchQuery }
  });
}
