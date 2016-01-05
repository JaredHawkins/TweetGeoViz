'use strict';

/* global require, module */

var monk = require('monk'),
    uuid = require('node-uuid'),
    mongoConfig = require('../config/config.json').mongo,
    Promise = require('promise'),
    validator = require('validator');

var tweets = {
  get: function(req, res, next) {
    var db = monk(mongoConfig.server + mongoConfig.databaseName),
        collection = db.get(mongoConfig.collection),
        q = req.query.search.split(','),
        queries = [],
        features = [];

    // multiple find statements for search multiple keywords
    q.forEach(function(value) {
      var val = validator.trim(validator.escape(value));
      var query = {
        $text: {
          $search: '"'+val+'"' // double quotes helps to search phrases with a space
        }
      };
      var promise = collection.find(query, { tln: 1, tlt: 1 });
      queries.push(promise);
    });

    // getting all results
    Promise.all(queries).then(function(values) {

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
    });
  }
};

module.exports = tweets;
