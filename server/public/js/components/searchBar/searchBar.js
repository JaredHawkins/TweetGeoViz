var tgv = tgv || {};

(function(utils, events, SearchBarView) {

  var SearchBar = function(options) {
    this._init = this._init.bind(this);
    this.emitOnFocus = this.emitOnFocus.bind(this);
    this.onSearch = this.onSearch.bind(this);

    var defaults = {
      control: this,
      componentSelector: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  SearchBar.prototype = {
    view: null
  };

  SearchBar.prototype._init = function SearchBar__init(options) {
    this.view = new SearchBarView(options);
  };

  SearchBar.prototype.emitOnFocus = function SearchBar_emitOnFocus() {
    events.emit('startTypingSearch');
  };

  SearchBar.prototype.onSearch = function SearchBar_onSearch(inputText) {
    if (!inputText || inputText.length === 0) {
      return;
    }

    var data = {
      tweetText: inputText
    };

    utils.serverSend('POST', '/search', data);
  };

  tgv.SearchBar = SearchBar;

})(tgv.utils, tgv.events, tgv.SearchBarView);
