var tgv = tgv || {};

(function(appModel, utils) {
  var TweetsPopupView = function(options) {
    this._init = this._init.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    var defaults = {
      control: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  TweetsPopupView.prototype = {
    _init: function SlidePanelView__init(options) {
      this._control = options.control;
      this.el = document.querySelector(options.componentSelector);

      var closeButton = this.el.querySelector('#tweetsPopup-close');

      // bind events
      closeButton.addEventListener('click', this._control._hidePopup);
    },

    hide: function TweetsPopupView_hide() {
      this.el.style.display = 'none';
    },

    show: function TweetsPopupView_show(x, y) {
      this.el.style.left = x + 'px';
      this.el.style.top = y + 'px';

      this.el.style.display = 'block';
    },

    el: null,
    _control: null
  };

  tgv.TweetsPopupView = TweetsPopupView;
})(tgv.appModel, tgv.utils);