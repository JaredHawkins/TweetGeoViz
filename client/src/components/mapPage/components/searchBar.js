'use strict';

var React = require('react');

var SearchBar = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    onClickSearch: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    searchQuery: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      searchQuery: ''
    };
  },

  componentDidMount: function() {
    var input = document.getElementById('searchBar-queryText');

    input.onkeypress = function(e) {
      if (!e) {
        e = window.event;
      }
      var keyCode = e.keyCode || e.which;

      if (keyCode == '13') {
        if (!input.value) {
          return false;
        }

        this._onClickSearch();
      }
    }.bind(this);
  },

  _onClickSearch: function(event) {
    // check first if there is anything to search for at all
    if (!this.props.searchQuery.trim().length) {
      return;
    }

    this.props.onClickSearch(event);
  },

  render: function() {
    return (
      <div id='searchBar' className='col-md-4'>
        <div className='input-group'>

          <span className='input-group-btn'>
            <button
              aria-label='Search'
              className='btn btn-default'
              onClick={this._onClickSearch} >
                <span
                  aria-hidden='true'
                  className='glyphicon glyphicon-search'>
                </span>
                Search
            </button>
          </span>

          <input
            id='searchBar-queryText'
            name='tweetText'
            placeholder='keyword1 , keyword2, keyword3, ...'
            aria-describedby='basic-addon'
            className='form-control'
            type='text'
            onChange={this.props.onChange}
            onClick={this.props.onFocus}
            value={this.props.searchQuery} />
          <span
            className='input-group-addon'
            id='basic-addon'>
            tweet keywords
          </span>
        </div>
      </div>
    );
  }
});

module.exports = SearchBar;
