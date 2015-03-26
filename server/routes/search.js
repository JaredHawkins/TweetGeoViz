/*global module*/

var searchRoutes = function(router) {
  //deal with search form - ors all words in search phrase together
  router.post('/search', function(req, res) {

    var db = req.db,
        collection = db.get('ControlTweets'),
        features = [];

    //execute db query
    collection.find({
      $text: {
        $search: req.body.tweetText
      }
    }, { tln: 1, tlt: 1 }, function(err, cursor) {

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
          text: item.t
        });
      });

      var geoJSONlist = {
        type: 'FeatureCollection',    // empty geojson blob
        features: features
      };

      return res.render('demo.jade', { pins: JSON.stringify(geoJSONlist), searchQuery: JSON.stringify(req.body.tweetText) });
    });
  });
};

module.exports = searchRoutes;