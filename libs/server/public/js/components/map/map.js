var tgv = tgv || {};

(function(utils, events, MapView) {
  var Map = function(options) {
    this._init = this._init.bind(this);
    this.mapClick = this.mapClick.bind(this);

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
      this.view.renderHeatMap(this._tweetCollection.generateHeatMap());

      // bind events
      events.on('closePopup', this.view.removeCircle);
    },

    mapClick: function Map_addHeatMap(x, y, bounds) {
      var tweets = this._tweetCollection.getTweetsInBounds(bounds);

      events.emit('mapClick', [x, y, tweets]);
    },

    view: null,
    _tweetCollection: null
  };

  tgv.Map = Map;
})(tgv.utils, tgv.events, tgv.MapView);