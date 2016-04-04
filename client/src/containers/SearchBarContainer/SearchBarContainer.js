import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as tweetsActions from '../../actions/tweetsActions.js';
import * as searchBarActions from '../../actions/searchBarActions.js';
import { SearchBar } from '../../components';

const ENTER_KEY_CODE = '13';

class SearchBarContainer extends Component {
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

  render() {
    const {
      searchQuery,
      changeValue,
      focus
    } = this.props;

    return <SearchBar
      searchQuery={searchQuery}
      onEnterKeyDown={this._onClickSearch}
      onFocus={focus}
      onClickSearch={this._onClickSearch}
      onChange={changeValue}
    />;
  }
}

SearchBarContainer.propTypes = {
  searchQuery: PropTypes.string,
  fetchTweets: PropTypes.func.isRequired,
  focus: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { searchQuery } = state.searchBar;

  return {
    searchQuery
  };
}

export default connect(
  mapStateToProps,
  {
    fetchTweets: tweetsActions.fetchTweets,
    focus: searchBarActions.focus,
    changeValue: searchBarActions.changeValue
  }
)(SearchBarContainer);
