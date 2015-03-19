var tgv = tgv || {};

(function(utils, events, SearchBarView) {
  var SearchBar = function(options) {
    this._init = this._init.bind(this);
    this.onSearch = this.onSearch.bind(this);

    var defaults = {
      control: this,
      componentSelector: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  SearchBar.prototype = {
    _init: function SearchBar__init(options) {
      this.view = new SearchBarView(options);
    },

    onSearch: function SearchBar_onSearch() {
      events.emit('onSearch');
    },

    view: null
  };

  tgv.SearchBar = SearchBar;
})(tgv.utils, tgv.events, tgv.SearchBarView);