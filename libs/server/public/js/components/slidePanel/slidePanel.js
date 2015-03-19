var tgv = tgv || {};

(function(utils, events, SlidePanelView) {
  var SlidePanel= function(options) {
    this._init = this._init.bind(this);
    this._slideShow = this._slideShow.bind(this);

    var defaults = {
      control: this,
      componentSelector: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  SlidePanel.prototype = {
    _init: function SlidePanel__init(options) {
      this.view = new SlidePanelView(options);

      events.on('onSearch', this._slideShow);
    },

    _slideShow: function SlidePanel__slideShow() {
      alert('hola');
    },

    showing: false,
    view: null
  };

  tgv.SlidePanel = SlidePanel;
})(tgv.utils, tgv.events, tgv.SlidePanelView);