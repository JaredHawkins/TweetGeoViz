import request from 'superagent';
import { apiConfig } from '../constants/config.js';
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
          if (error.response) {
            return reject(error.response.error.message);
          }
          reject(error.message || error);
        }

        resolve(response.body);
      });
  });
}

export function getTweets(searchString) {
  return createRequest({
    url: urls.tweets,
    query: { searchString }
  });
}
