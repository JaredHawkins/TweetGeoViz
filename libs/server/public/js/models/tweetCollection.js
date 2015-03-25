var tgv = tgv || {};

(function(utils) {
  var TweetCollection = function(options) {
    this._init = this._init.bind(this);
    this.generateHeatMap = this.generateHeatMap.bind(this);
    this.getTweetsInBounds = this.getTweetsInBounds.bind(this);

    var defaults = {
      features: []
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  TweetCollection.prototype = {
    _init: function TweetCollection__init(options) {
      this._features = options.features;
    },

    generateHeatMap: function TweetCollection_generateHeatMap() {
      var heatmapData = [];

      //create heatmap layer
      for (var i = 0, len = this._features.length; i < len; i++) {
        var coords = this._features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        heatmapData.push(latLng);
      }

      return heatmapData;
    },

    getTweetsInBounds: function TweetCollection_getTweetsInBounds(bounds) {
      var tweets = [];

      for (var i = 0, len = this._features.length; i < len; i++) {
        var coords = this._features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);

        if (bounds.contains(latLng)) {
          tweets.push(this._features[i]);
        }
      }

      return tweets;
    },

    _features: null
  };

  tgv.TweetCollection = TweetCollection;
})(tgv.utils);