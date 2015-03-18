var tgv = tgv || {};

(function(utils) {
  var MapView = function(options) {
    this._init = this._init.bind(this);

    var defaults = {
      control: null,
      componentSelector: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  MapView.prototype = {
    _init: function MapView__init(options) {

    },

    el: null,
    _control: null
  };

  tgv.MapView = MapView;
})(tgv.utils);