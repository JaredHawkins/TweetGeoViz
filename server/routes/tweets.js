'use strict';

/* global require, module */

var tweetsStore = require('../store/tweetsStore'),
    uuid = require('node-uuid'),
    Promise = require('promise'),
    validator = require('validator');

var tweets = {
  get: function(req, res, next) {
    if (!req.query.search) {
      res.status(200);
      res.json({
        type: 'FeatureCollection',
        features: [],
        uuid: uuid.v1()
      });
      return;
    }

    var q = req.query.search.split(','),
        queries = [],
        features = [];

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

    // multiple find statements for searching multiple keywords
    q.forEach(function(value) {
      var val = validator.trim(validator.escape(value));
      var promise = tweetsStore.get(val);
      queries.push(promise);
    });

    // getting all results
    Promise
      .all(queries)
      .then(getResults)
      .catch(function(err) {
        console.error(err);
        res.status(503).send(err.message);
      });
  }
};

module.exports = tweets;
