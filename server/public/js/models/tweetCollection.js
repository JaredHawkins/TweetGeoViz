/*global google*/

var tgv = tgv || {};

(function(utils) {

  var TweetCollection = function(options) {
    this._init = this._init.bind(this);
    this.generateHeatMap = this.generateHeatMap.bind(this);
    this.getTweetsInBounds = this.getTweetsInBounds.bind(this);

    var defaults = {
      pins: []
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  TweetCollection.prototype = {
    _pins: null
  };

  TweetCollection.prototype._init = function TweetCollection__init(options) {
    this._pins = options.pins;
  };

  TweetCollection.prototype.generateHeatMap =
                                    function TweetCollection_generateHeatMap() {
    var heatmapData = [],
        features = this._pins.features || [];

    //create heatmap layer
    for (var i = 0, len = features.length; i < len; i++) {
      var coords = features[i].geometry.coordinates,
          latLng = new google.maps.LatLng(coords[1], coords[0]);
      heatmapData.push(latLng);
    }

    return heatmapData;
  };

  TweetCollection.prototype.getTweetsInBounds =
                            function TweetCollection_getTweetsInBounds(bounds) {
    var tweets = [],
        features = this._pins.features || [];

    for (var i = 0, len = features.length; i < len; i++) {
      var coords = features[i].geometry.coordinates,
          latLng = new google.maps.LatLng(coords[1], coords[0]);

      if (bounds.contains(latLng)) {
        tweets.push(features[i]);
      }
    }

    return tweets;
  };

  tgv.TweetCollection = TweetCollection;

})(tgv.utils);
