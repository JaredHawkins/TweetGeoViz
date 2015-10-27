'use strict';

var React = require('react'),
    SearchBarActions = require('../../actions/searchBarActions.js');

var SearchBar = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
    searchQuery: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      searchQuery: ''
    };
  },

  _onSearchInputClick: function() {
    SearchBarActions.onFocus();
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

        this.props.onClick();
      }
    }.bind(this);
  },

  render: function() {
    return (
      <div id='searchBar' className='col-md-4'>
        <div className='input-group'>
          <span className='input-group-btn'>
            <button aria-label='Search' className='btn btn-default' onClick={this.props.onClick}>
              <span aria-hidden='true' className='glyphicon glyphicon-search'></span>
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
            onClick={this._onSearchInputClick}
            onChange={this.props.onChange}
            value={this.props.searchQuery} />
          <span className='input-group-addon' id='basic-addon'>tweet keywords</span>
        </div>
      </div>
    );
  }
});

module.exports = SearchBar;
