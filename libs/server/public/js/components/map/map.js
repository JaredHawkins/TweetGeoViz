var tgv = tgv || {};

(function(utils, events, MapView) {
  var Map = function(options) {
    this._init = this._init.bind(this);
    this.mapClick = this.mapClick.bind(this);
    this.hideClickOverlay = this.hideClickOverlay.bind(this);

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

      // add a heatMap if it is present
      var heatMap = this._tweetCollection.generateHeatMap();
      if (heatMap.length) {
        this.view.renderHeatMap(this._tweetCollection.generateHeatMap());
      }

      // bind events
      events.on('closePopup', this.hideClickOverlay);
    },

    mapClick: function Map_addHeatMap(x, y, lat, lng) {
      if (this.showingClickOverlay) {
        return;
      }

      this.view.addMapCircle(lat, lng);

      var bounds = this.view.getCircleBounds(),
          tweets = this._tweetCollection.getTweetsInBounds(bounds);

      events.emit('mapClick', [x, y, tweets]);
      this.showingClickOverlay = true;
    },

    hideClickOverlay: function Map_hideClickOverlay() {
      this.showingClickOverlay = false;
      this.view.removeCircle();
    },

    view: null,
    showingClickOverlay: false,
    _tweetCollection: null
  };

  tgv.Map = Map;
})(tgv.utils, tgv.events, tgv.MapView);