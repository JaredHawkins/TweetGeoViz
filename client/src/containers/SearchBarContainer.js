import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchTweets } from '../actions/tweetsActions.js';
import { focus, changeValue } from '../actions/searchBarActions.js';
import SearchBar from '../components/SearchBar/SearchBar.js';

class SearchBarContainer extends Component {
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
      fetchTweets
    } = this.props;

    // check first if there is anything to search for at all
    if (!searchQuery.trim().length) {
      return;
    }

    fetchTweets(searchQuery);
  };

  _onChange = event => {
    const { name, value } = event.target;
    const { changeValue } = this.props;
    changeValue(name, value);
  };

  render() {
    const {
      searchQuery,
      focus
    } = this.props;

    return <SearchBar
      searchQuery = {searchQuery}
      onKeyPress = {this._onKeyPress}
      onFocus = {() => focus()}
      onClickSearch = {this._onClickSearch}
      onChange = {this._onChange} />;
  }
};

SearchBarContainer.propTypes = {
  searchQuery: PropTypes.string
};

function mapStateToProps(state) {
  const { searchQuery } = state.searchBar;

  return {
    searchQuery
  }
}

export default connect(
  mapStateToProps,
  { fetchTweets, focus, changeValue }
)(SearchBarContainer);
