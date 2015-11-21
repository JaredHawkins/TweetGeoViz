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
    this.refs.searchQuery.onkeypress = function(event) {
      var value = event.target.value;

      if (!event) {
        event = window.event;
      }
      var keyCode = event.keyCode || event.which;

      if (keyCode == '13') {
        if (!value) {
          return false;
        }

        this._onClickSearch();
      }
    }.bind(this);
  },

  _onClickSearch: function() {

    // check first if there is anything to search for at all
    if (!this.props.searchQuery.trim().length) {
      return;
    }

    this.props.onClickSearch();
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
            name='searchQuery'
            ref = 'searchQuery'
            placeholder='search keywords'
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
