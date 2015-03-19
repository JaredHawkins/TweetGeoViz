var tgv = tgv || {};

(function(utils) {
  var SlidePanelView = function(options) {
    this._init = this._init.bind(this);

    var defaults = {
      control: null,
      componentSelector: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  SlidePanelView.prototype = {
    _init: function SlidePanelView__init(options) {

    },

    el: null,
    _control: null
  };

  tgv.SlidePanelView = SlidePanelView;
})(tgv.utils);