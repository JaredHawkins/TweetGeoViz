var tgv = tgv || {};

(function(utils, events, MapView) {
  var Map = function(options) {
    this._init = this._init.bind(this);
    this.mapClick = this.mapClick.bind(this);
    this.addHeatMap = this.addHeatMap.bind(this);

    var defaults = {
      componentSelector: null,
      control: this,
      tweetCollection: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  Map.prototype = {
    _init: function Map__init(options) {
      this.view = new MapView(options);
      this._tweetCollection = options.tweetCollection;

      //this.view.renderHeatMap(this._tweetCollection.generateHeatMap());

      // bind events
      events.on('closePopup', this.view.removeCircle);
    },

    mapClick: function Map_addHeatMap(x, y, lat, lng) {
      events.emit('mapClick', [x, y, lat, lng]);
    },

    addHeatMap: function Map_addHeatMap(pins) {
      // var heatmapData = [];

      // //create heatmap layer
      // for (var i = 0, len = pins.features.length; i < len; i++) {
      //   var coords = pins.features[i].geometry.coordinates;
      //   var latLng = new google.maps.LatLng(coords[1], coords[0]);
      //   heatmapData.push(latLng);
      // }

      //this.view.renderHeatMap(heatmapData);
    },

    view: null,
    _tweetCollection: null
  };

  tgv.Map = Map;
})(tgv.utils, tgv.events, tgv.MapView);