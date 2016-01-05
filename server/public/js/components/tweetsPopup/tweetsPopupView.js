var tgv = tgv || {};

(function(appModel, utils) {

  var TweetsPopupView = function(options) {
    this._init = this._init.bind(this);
    this._createTweetRow = this._createTweetRow.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    var defaults = {
      control: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  TweetsPopupView.prototype = {
    el: null,
    _panelBody: null,
    _headerText: null,
    _control: null
  };

  TweetsPopupView.prototype._init = function TweetsPopupView__init(options) {
    this._control = options.control;
    this.el = document.querySelector(options.componentSelector);

    var closeButton = this.el.querySelector('#tweetsPopup-close');

    this._panelBody = this.el.querySelector('.panel-body ul');
    this._headerText = this.el.querySelector('.panel-heading strong');

    // bind events
    closeButton.addEventListener('click', this._control._hidePopup);
  };

  TweetsPopupView.prototype._createTweetRow =
                              function TweetsPopupView__createTweetRow(tweet) {
    var li = document.createElement('li'),
        div = document.createElement('div'),
        span = document.createElement('span'),
        keywords = appModel.searchQuery.split(','), // split searchQuery
        html = tweet.text;

    div.className = 'tweetText';

    // Assigning the selection class to every matched keyword
    for(var i = 0; i < keywords.length; i++){
      regex = new RegExp(keywords[i].trim(), 'ig');
      html = html.replace(regex,
        '<span class="selection">$&</span>');
    }

    span.innerHTML = html;

    div.appendChild(span);
    li.appendChild(div);

    return li;
  };

  TweetsPopupView.prototype.hide = function TweetsPopupView_hide() {
    this.el.style.display = 'none';
  };

  TweetsPopupView.prototype.show = function TweetsPopupView_show(x, y, tweets) {
    this.el.style.left = x + 'px';
    this.el.style.top = y + 'px';

    this._panelBody.innerHTML = '';

    if (!tweets.length) {
      this._panelBody.appendChild(this._createTweetRow({
        text: 'No Tweets Found'
      }));
    } else {
      for (var i = 0, len = tweets.length; i < len; ++i) {
        this._panelBody.appendChild(this._createTweetRow(tweets[i]));
      }
    }

    // change popup header to show how many tweets we found
    this._headerText.innerHTML = tweets.length + ' Tweets';

    this.el.style.display = 'block';
  };

  tgv.TweetsPopupView = TweetsPopupView;

})(tgv.appModel, tgv.utils);
