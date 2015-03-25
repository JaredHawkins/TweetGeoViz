var tgv = tgv || {};

(function(utils) {
  var TweetCollection = function(options) {
    this._init = this._init.bind(this);
    this.generateHeatMap = this.generateHeatMap.bind(this);

    var defaults = {
      pins: []
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  TweetCollection.prototype = {
    _init: function TweetCollection__init(options) {
      this._pins = options.pins;
    },

    generateHeatMap: function TweetCollection_generateHeatMap() {
      var heatmapData = [],
          pins = this._pins;

      pins.features = pins.features || [];

      //create heatmap layer
      for (var i = 0, len = pins.features.length; i < len; i++) {
        var coords = pins.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        heatmapData.push(latLng);
      }

      return heatmapData;
    },

    _pins: null
  };

  tgv.TweetCollection = TweetCollection;
})(tgv.utils);