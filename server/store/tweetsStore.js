import tweetsCollection from './models/tweet.js';
import Promise from 'promise';

export function getTweets(options = {}) {
  const {
    searchQuery,
    startDate,
    endDate
  } = options;

  if (tweetsCollection.db._readyState === 0 || tweetsCollection.db._readyState > 1) {
    return new Promise((resolve, reject) => {
      reject(new Error('Database is not responding'));
    });
  }

  let query = {
    $text: {
      $search: `"${searchQuery}"` // double quotes helps to search phrases with a space
    }
  };

  if (startDate) {
    query.cr = {
      ...query.cr,
      $gte: new Date(startDate)
    };
  }

  if (endDate) {
    query.cr = {
      ...query.cr,
      $lte: new Date(endDate)
    };
  }

  const sortQuery = { cr: -1 }; // sort by timestamp

  return tweetsCollection
    .find(query)
    .sort(sortQuery)
    .exec();
}
