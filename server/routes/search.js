/*global module*/
var validator = require('validator'),
    Promise = require('promise');

var searchRoutes = function(router) {
  //deal with search form - ors all words in search phrase together
  router.post('/search', function(req, res) {

    var db = req.db,
        collection = db.get('ControlTweets'),
        features = [],
        q = req.body.tweetText.split(','),
        queries = [];

    // multiple find statements for search multiple keywords
    q.forEach(function(v, i, a){
      var val = validator.escape(v);
      val = validator.trim(val);

      var query = {
        $text: {
          $search: '"'+val+'"' // double quotes helps to search phrases with a space
        }
      };

      var promise = collection.find(query, { tln: 1, tlt: 1 });
      queries.push(promise); // promise array
    });

    // getting all results
    Promise.all(queries).then(function(values){

      values = values || [];

      values.forEach(function(cursor){
        //chew up each database entry into geoJSON;
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
            text: item.t
          });
        });
      });

      //render the page with the data overlay once we reach the end of the list of matches.
      var geoJSONlist = {
        type: 'FeatureCollection',    // empty geojson blob
        features: features
      };

      return res.render('demo.jade', { pins: JSON.stringify(geoJSONlist), searchQuery: JSON.stringify(req.body.tweetText) });
    });

  });
};

module.exports = searchRoutes;
