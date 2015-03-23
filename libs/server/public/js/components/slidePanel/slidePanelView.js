var tgv = tgv || {};

(function(utils) {
  var SlidePanelView = function(options) {
    this._init = this._init.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    var defaults = {
      control: null,
      componentSelector: null
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