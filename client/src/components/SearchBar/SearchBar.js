// webpack specific - including required JS and CSS files
require('./searchBar.less');

import React, { Component, PropTypes } from 'react';
import { T__ } from '../../reducers/language.js';

class SearchBar extends Component {
  render() {
    const {
      searchQuery = '',
      onFocus,
      onChange,
      onKeyPress,
      onClickSearch
    } = this.props;

    return (
      <div className='row'>
        <div id='searchBar' className='col-md-4 col-xs-12'>
          <div className='input-group'>

            <span className='input-group-btn'>
              <button
                aria-label='Search'
                className='btn btn-default'
                onClick={onClickSearch}
              >
                <span
                  aria-hidden='true'
                  className='glyphicon glyphicon-search'>
                </span>
                {T__('mapPage.searchBar.searchButton.label')}
              </button>
            </span>

            <input
              name='searchQuery'
              placeholder={T__('mapPage.searchBar.searchInput.placeholder')}
              aria-describedby='basic-addon'
              className='form-control'
              type='text'
              onChange={onChange}
              onClick={onFocus}
              onKeyPress = {onKeyPress}
              value={searchQuery} />
            <span
              className='input-group-addon'
              id='basic-addon'
            >
              {T__('mapPage.searchBar.searchLabel')}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onClickSearch: PropTypes.func,
  onFocus: PropTypes.func,
  searchQuery: PropTypes.string
};

export default SearchBar;
