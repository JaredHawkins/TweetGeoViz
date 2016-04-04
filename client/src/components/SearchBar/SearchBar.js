// webpack specific - including required JS and CSS files
require('./searchBar.less');

import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';
import { T__ } from '../../reducers/language.js';

class SearchBar extends Component {
  render() {
    const {
      searchQuery = '',
      onFocus,
      onChange,
      onEnterKeyDown,
      onClickSearch
    } = this.props;

    const styles = {
      button: {
        margin: 12,
      }
    };


    return (
      <div id="searchBar">
        <div className="row">
          <div className="col-md-5 col-xs-12 col-md-offset-2" zDepth={2}>
            <Paper className="row">
              <div className="col-xs-3">
                <FlatButton
                  labelPosition="before"
                  label={T__('mapPage.searchBar.searchButton.label')}
                  icon={<ActionSearch />}
                  style={styles.button}
                  onClick={onClickSearch}
                />
              </div>
              <div className="col-xs-9">
                <TextField
                  name="searchQuery"
                  hintText={T__('mapPage.searchBar.searchInput.placeholder')}

                  fullWidth={true}
                  value={searchQuery}
                  onEnterKeyDown={onEnterKeyDown}
                  onFocus={onFocus}
                  onChange={event=>{
                    const { name, value } = event.target;
                    onChange(name, value);
                  }}
                />
              </div>

            </Paper>

          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-xs-12">
            <div className="input-group">

              <span className="input-group-btn">
                <button
                  aria-label="Search"
                  className="btn btn-default"
                  onClick={onClickSearch}
                >
                  <span
                    aria-hidden="true"
                    className="glyphicon glyphicon-search"
                  >
                  </span>
                  {T__('mapPage.searchBar.searchButton.label')}
                </button>
              </span>



              <input
                name="searchQuery"
                placeholder={T__('mapPage.searchBar.searchInput.placeholder')}
                aria-describedby="basic-addon"
                className="form-control"
                type="text"
                onChange={onChange}
                onClick={onFocus}
                onKeyPress = {onEnterKeyDown}
                value={searchQuery}
              />
              <span
                className="input-group-addon"
                id="basic-addon"
              >
                {T__('mapPage.searchBar.searchLabel')}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onEnterKeyDown: PropTypes.func,
  onClickSearch: PropTypes.func,
  onFocus: PropTypes.func,
  searchQuery: PropTypes.string
};

export default SearchBar;
