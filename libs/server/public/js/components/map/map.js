var tgv = tgv || {};

(function(utils, SearchBarView) {
  var Map = function(options) {
    this._init = this._init.bind(this);

    var defaults = {
      control: this,
      componentSelector: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  Map.prototype = {
    _init: function Map__init(options) {
      this.view = new SearchBarView(options);
    },

    view: null
  };

  tgv.Map = Map;
})(tgv.utils, tgv.SearchBarView);