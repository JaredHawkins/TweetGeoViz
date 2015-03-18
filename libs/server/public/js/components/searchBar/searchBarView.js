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

      // Set CSS for the control border.
      var controlUI = document.createElement('div');
      controlUI.className = 'searchBar-button';
      controlUI.title = 'Click to set the map to Home';
      this.el.appendChild(controlUI);

      // Set CSS for the control interior.
      var controlText = document.createElement('div');
      controlText.className = 'searchBar-button-buttonText';
      controlText.innerHTML = '<strong>Home</strong>';
      controlUI.appendChild(controlText);
    },

    el: null,
    _control: null
  };

  tgv.SearchBarView = SearchBarView;
})(tgv.utils);