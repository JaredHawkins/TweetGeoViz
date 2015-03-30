var tgv = tgv || {};

(function(appModel, utils, events, TweetsPopupView) {

  var TweetsPopup = function(options) {
    this._init = this._init.bind(this);
    this._showPopup = this._showPopup.bind(this);
    this._hidePopup = this._hidePopup.bind(this);

    var defaults = {
      control: this,
      componentSelector: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  TweetsPopup.prototype = {
    showing: false,
    view: null
  };

  TweetsPopup.prototype._init = function TweetsPopup__init(options) {
    this.view = new TweetsPopupView(options);

    // bind events
    events.on('mapClick', this._showPopup);
  };

  TweetsPopup.prototype._showPopup =
                                function TweetsPopup__showPopup(x, y, tweets) {
    tweets = tweets || [];

    this.showing = true;
    appModel.showingTweetsPopup = this.showing;

    this.view.show(x, y, tweets);
  };

  TweetsPopup.prototype._hidePopup = function TweetsPopup__hidePopup() {
    this.showing = false;
    appModel.showingTweetsPopup = this.showing;

    this.view.hide();

    events.emit('closePopup');
  };

  tgv.TweetsPopup = TweetsPopup;

})(tgv.appModel, tgv.utils, tgv.events, tgv.TweetsPopupView);
