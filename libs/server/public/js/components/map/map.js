var tgv = tgv || {};

(function(utils, MapView) {
  var Map = function(options) {
    this._init = this._init.bind(this);
    this.addHeatMap = this.addHeatMap.bind(this);

    var defaults = {
      componentSelector: null,
      control: this
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  Map.prototype = {
    _init: function Map__init(options) {
      this.view = new MapView(options);
    },

    addHeatMap: function Map_addHeatMap(pins) {
      var heatmapData = [];

      //create heatmap layer
      for (var i = 0, len = pins.features.length; i < len; i++) {
        var coords = pins.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        heatmapData.push(latLng);
      }

      this.view.renderHeatMap(heatmapData);
    },

    view: null
  };

  tgv.Map = Map;
})(tgv.utils, tgv.MapView);