'use strict';

/* global require, module */

var monk = require('monk'),
    mongoConfig = require('../config/config.json').mongo;

var tweets = {
  get: function(req, res, next) {
    var db = monk(mongoConfig.server + mongoConfig.databaseName),
        collection = db.get(mongoConfig.collection);

    //execute db query
    collection.find({
      $text: {
        $search: req.query.search
      }
    }, { tln: 1, tlt: 1 }, function(error, cursor) {

      var features = [];

      if (error) {
        return next(error);
      }

      cursor = cursor || [];

      //chew up each database entry into geoJSON;
      //render the page with the data overlay once we reach the end of the list of matches.
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

      var geoJSONlist = {
        type: 'FeatureCollection',    // empty geojson blob
        features: features
      };

      res.status(200);
      res.json(geoJSONlist);
    });
  }
};

module.exports = tweets;