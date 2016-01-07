// webpack specific - including required JS and CSS files
require('../../../less/mapPage/searchBar.less');

import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
  _onKeyPress = event => {
    const { value } = event.target;

    if (!event) {
      event = window.event;
    }

    let keyCode = event.keyCode || event.which;

    if (keyCode == '13') {
      if (!value) {
        return false;
      }

      this._onClickSearch();
    }
  };

  _onClickSearch = () => {
    const {
      searchQuery,
      onClickSearch
    } = this.props;

    // check first if there is anything to search for at all
    if (!searchQuery.trim().length) {
      return;
    }

    onClickSearch();
  };

  render() {
    const {
      searchQuery = '',
      onFocus,
      onChange
    } = this.props;

    return (
      <div className='row'>
        <div id='searchBar' className='col-md-4 col-xs-12'>
          <div className='input-group'>

            <span className='input-group-btn'>
              <button
                aria-label='Search'
                className='btn btn-default'
                onClick={this._onClickSearch}
              >
                <span
                  aria-hidden='true'
                  className='glyphicon glyphicon-search'>
                </span>
                Search
              </button>
            </span>

            <input
              name='searchQuery'
              placeholder='search keywords'
              aria-describedby='basic-addon'
              className='form-control'
              type='text'
              onChange={onChange}
              onClick={onFocus}
              onKeyPress = {this._onKeyPress}
              value={searchQuery} />
            <span
              className='input-group-addon'
              id='basic-addon'
            >
              tweet keywords
            </span>
          </div>
        </div>
      </div>
    );
  }
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClickSearch: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  searchQuery: PropTypes.string
};

export default SearchBar;
