var tgv = tgv || {};

(function(utils) {
  var SlidePanelView = function(options) {
    this._init = this._init.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    var defaults = {
      control: null,
      componentSelector: null,
      clickRadius: null,
      enableMapClick: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  SlidePanelView.prototype = {
    _init: function SlidePanelView__init(options) {
      this._control = options.control;
      this.el = document.querySelector(options.componentSelector);

      this._snapper = new Snap({
        element: document.querySelector(options.contentSelector),
        tapToClose: false,
        touchToDrag: false,
        hyperextensible: false
      });

      var clickRadiusInput = this.el
        .querySelector('#cursor-click-radius-input');
      clickRadiusInput.value = options.clickRadius;

      var enableMapClickCheckbox = this.el
        .querySelector('#enable-map-click-checkbox');
      enableMapClickCheckbox.checked = options.enableMapClick === 'true';

      // bind events
      clickRadiusInput.oninput = function() {
        this._control.radiusInputChange(clickRadiusInput.value);
      }.bind(this);
      enableMapClickCheckbox.onchange = function() {
        this._control.enableMapClickChange(enableMapClickCheckbox.checked);
      }.bind(this);
    },

    hide: function SlidePanelView_hide() {
      this._snapper.close();
    },

    show: function SlidePanelView_show() {
      this._snapper.open('left');
    },

    el: null,
    _snapper: null,
    _control: null
  };

  tgv.SlidePanelView = SlidePanelView;
})(tgv.utils);