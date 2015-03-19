var tgv = tgv || {};

(function(utils) {
  var SearchBarView = function(options) {
    this._init = this._init.bind(this);

    var defaults = {
      control: null,
      componentSelector: null
    };

    options = utils.deepExtend({}, defaults, options);

    this._init(options);
  };

  SearchBarView.prototype = {
    _init: function SearchBarView__init(options) {
      this._control = options.control;

      this.el = document.querySelector(options.componentSelector);

      // create Search Button
      var searchButton = document.createElement('button');
      searchButton.className = 'btn btn-default btn-lg';
      searchButton.setAttribute('aria-label', 'Search');
      searchButton.addEventListener('click', this._control.onSearch);

      var searchButtonSpan = document.createElement('span');
      searchButtonSpan.className = 'glyphicon glyphicon-search';
      searchButtonSpan.setAttribute('aria-hidden', 'true');

      searchButton.appendChild(searchButtonSpan);
      searchButton.innerHTML += ' Search';
      this.el.appendChild(searchButton);
    },

    el: null,
    _control: null
  };

  tgv.SearchBarView = SearchBarView;
})(tgv.utils);