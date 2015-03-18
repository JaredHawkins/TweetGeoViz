var tgv = tgv || {};

(function(utils, SearchBarView) {
  var SearchBar = function(options) {
    this._init = this._init.bind(this);

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

    view: null
  };

  tgv.SearchBar = SearchBar;
})(tgv.utils, tgv.SearchBarView);