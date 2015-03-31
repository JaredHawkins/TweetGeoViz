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
    el: null,
    _control: null
  };

  SearchBarView.prototype._init = function SearchBarView__init(options) {
    this._control = options.control;

    this.el = document.querySelector(options.componentSelector);

    var form = document.createElement('form');
    form.method = 'post';
    form.action = 'search';
    form.id = 'searchBarForm';

    var inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    var buttonSpan = document.createElement('span');
    buttonSpan.className = 'input-group-btn';

    // create Search Button
    var searchButton = document.createElement('button');
    searchButton.className = 'btn btn-default';
    searchButton.setAttribute('aria-label', 'Search');

    var searchButtonSpan = document.createElement('span');
    searchButtonSpan.className = 'glyphicon glyphicon-search';
    searchButtonSpan.setAttribute('aria-hidden', 'true');

    searchButton.appendChild(searchButtonSpan);
    searchButton.innerHTML += ' Search';

    var span = document.createElement('span');
    span.id = 'basic-addon';
    span.className = 'input-group-addon';
    span.innerHTML = 'tweet keywords';

    var input = document.createElement('input');
    input.className='form-control';
    input.setAttribute('aria-describedby', 'basic-addon');
    input.setAttribute('placeholder', 'keyword1 , keyword2, keyword3, ...');
    input.type = 'text';
    input.name = 'tweetText';

    buttonSpan.appendChild(searchButton);

    inputGroup.appendChild(buttonSpan);
    inputGroup.appendChild(input);
    inputGroup.appendChild(span);

    form.appendChild(inputGroup);

    this.el.appendChild(form);

    // bind events
    searchButton.addEventListener('click', form.submit);
    input.onkeypress = function(e) {
      if (!e) {
        e = window.event;
      }
      var keyCode = e.keyCode || e.which;

      if (keyCode == '13') {
        if (!input.value) {
          return false;
        }

        form.submit();
      }
    };

    input.onclick = this._control.emitOnFocus;
  };

  tgv.SearchBarView = SearchBarView;

})(tgv.utils);
