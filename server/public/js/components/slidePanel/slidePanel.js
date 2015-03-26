var tgv = tgv || {};

(function(appModel, utils, events, SlidePanelView) {
  var SlidePanel= function(options) {
    this._init = this._init.bind(this);
    this._slideShow = this._slideShow.bind(this);
    this._slideHide = this._slideHide.bind(this);
    this.radiusInputChange = this.radiusInputChange.bind(this);
    this.enableMapClickChange = this.enableMapClickChange.bind(this);

    var defaults = {
      control: this,
      componentSelector: null,
      clickRadius: appModel.getClickRadius(),
      enableMapClick: appModel.getMapClickEnabled()
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
      appModel.showingSidePanel = this.showing;
      this.view.show();
    },

    _slideHide: function SlidePanel__slideHide() {
      this.showing = false;
      appModel.showingSidePanel = this.showing;
      this.view.hide();
    },

    radiusInputChange: function SlidePanel_radiusInputChange(value) {
      appModel.setClickRadius(value);
    },

    enableMapClickChange: function SlidePanel_enableMapClickChange(value) {
      appModel.setMapClickEnabled(value);
    },

    showing: false,
    view: null
  };

  tgv.SlidePanel = SlidePanel;
})(tgv.appModel, tgv.utils, tgv.events, tgv.SlidePanelView);