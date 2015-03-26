var tgv = tgv || {};

(function(utils) {
  var AppModel = function(options) {
    this._init = this._init.bind(this);

    this.getClickRadius = this.getClickRadius.bind(this);
    this.getMapClickEnabled = this.getMapClickEnabled.bind(this);
    this.setClickRadius = this.setClickRadius.bind(this);
    this.setMapClickEnabled = this.setMapClickEnabled.bind(this);
    this.getClickRadiusMeters = this.getClickRadiusMeters.bind(this);

    // get default values from localStorage if they are available
    var defaults = {
      clickRadius: 250,
      mapClickEnabled: true
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  AppModel.prototype = {
    _init: function App_Model__init(options) {

      this._clickRadius = options.clickRadius;
      this._mapClickEnabled = options.mapClickEnabled;

      // overwrite data from localStorage storage if it is available
      if (localStorage.getItem('clickRadius') !== null) {
        this._clickRadius = localStorage.getItem('clickRadius');
      }

      if (localStorage.getItem('mapClickEnabled') !== null) {
        this._mapClickEnabled = localStorage.getItem('mapClickEnabled');
      }
    },

    getClickRadiusMeters: function AppModel_getClickRadiusMeters() {
      var km = 1000;

      return this._clickRadius * km;
    },

    getClickRadius: function AppModel_getClickRadius() {
      return this._clickRadius;
    },

    getMapClickEnabled: function AppModel_getMapClickEnabled() {
      return this._mapClickEnabled;
    },

    setClickRadius: function AppModel_setClickRadius(value) {
      this._clickRadius = value;
      localStorage.setItem('clickRadius', value);
    },

    setMapClickEnabled: function AppModel_setMapClickEnabled(value) {
      this._mapClickEnabled = value;
      localStorage.setItem('mapClickEnabled', value);
    },

    showingSidePanel: false,
    showingTweetsPopup: false,
    searchQuery: null,
    _mapClickEnabled: null,
    _clickRadius: null
  };

  tgv.appModel = new AppModel();
})(tgv.utils);

// Node.js support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = tgv.appModel;
}