var tgv = tgv || {};

(function(appModel, utils, events, MapView) {

  var Map = function(options) {
    this._init = this._init.bind(this);
    this.mapClick = this.mapClick.bind(this);
    this.hideClickOverlay = this.hideClickOverlay.bind(this);

    var defaults = {
      control: this,
      componentSelector: null,
      tweetCollection: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  Map.prototype = {
    view: null,
    showingClickOverlay: false,
    _tweetCollection: null
  };

  Map.prototype._init = function Map__init(options) {
    this.view = new MapView(options);
    this._tweetCollection = options.tweetCollection;

    // add a heatMap if it is present
    var heatMap = this._tweetCollection.generateHeatMap();
    if (heatMap.length) {
      this.view.renderHeatMap(this._tweetCollection.generateHeatMap());
    }

    // bind events
    events.on('closePopup', this.hideClickOverlay);
  };

  Map.prototype.mapClick = function Map_addHeatMap(x, y, lat, lng) {
    // check if click is disabled in settings
    if (!appModel.getMapClickEnabled()) {
      return;
    }

    // check if already showing popup overlay
    if (this.showingClickOverlay) {
      return;
    }

    this.view.addMapCircle(lat, lng);

    var bounds = this.view.getCircleBounds(),
        tweets = this._tweetCollection.getTweetsInBounds(bounds);

    this.showingClickOverlay = true;

    events.emit('mapClick', [x, y, tweets]);
  };

  Map.prototype.hideClickOverlay = function Map_hideClickOverlay() {
    this.showingClickOverlay = false;
    this.view.removeCircle();
  };

  tgv.Map = Map;

})(tgv.appModel, tgv.utils, tgv.events, tgv.MapView);
