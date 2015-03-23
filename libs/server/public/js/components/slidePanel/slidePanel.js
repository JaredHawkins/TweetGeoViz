var tgv = tgv || {};

(function(utils, events, SlidePanelView) {
  var SlidePanel= function(options) {
    this._init = this._init.bind(this);
    this._slideShow = this._slideShow.bind(this);
    this._slideHide = this._slideHide.bind(this);

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

      // bind events
      events.on('startTypingSearch', this._slideShow);
      events.on('mapClick', this._slideHide);
    },

    _slideShow: function SlidePanel__slideShow() {
      this.showing = true;
      this.view.show();
    },

    _slideHide: function SlidePanel__slideHide() {
      this.showing = false;
      this.view.hide();
    },

    showing: false,
    view: null
  };

  tgv.SlidePanel = SlidePanel;
})(tgv.utils, tgv.events, tgv.SlidePanelView);