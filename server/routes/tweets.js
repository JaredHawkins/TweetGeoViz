'use strict';

/* global require, module */

var tweetsCollection = require('../models/tweets'),
    uuid = require('node-uuid'),
    Promise = require('promise'),
    validator = require('validator');

var tweets = {
  get: function(req, res, next) {
    var q = req.query.search.split(','),
        queries = [],
        features = [];


    if (tweetsCollection.db._readyState == 0 || tweetsCollection.db._readyState > 1) {
      console.log('Database is not responding');
      res.status(503).send('Database is not responding');
    }

    // process db results
    function getResults(values) {
      values = values || [];

      //chew up each database entry into geoJSON;
      //render the page with the data overlay once we reach the end of the list of matches.
      values.forEach(function(cursor) {
        cursor = cursor || [];

        cursor.forEach(function(item) {
          if (!item) {
            return;
          }

          features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [item.tln, item.tlt]
            },
            text: item.t,
            _id: item._id
          });
        });
      });

      var geoJSONlist = {
        type: 'FeatureCollection',    // empty geojson blob
        features: features,
        uuid: uuid.v1()
      };

      res.status(200);
      res.json(geoJSONlist);
    }

    // multiple find statements for search multiple keywords
    q.forEach(function(value) {
      var val = validator.trim(validator.escape(value));
      var query = {
        $text: {
          $search: '"'+val+'"' // double quotes helps to search phrases with a space
        }
      };

      var promise = tweetsCollection.find(query).sort({ tln: 1, tlt: 1 }).exec();
      queries.push(promise);
    });

    // getting all results
    Promise
      .all(queries)
      .then(getResults)
      .catch(function(err) {
        console.error(err);
        res.status(503).send('Query errors');
      });
  }
};

module.exports = tweets;
