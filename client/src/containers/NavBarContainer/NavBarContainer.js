import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import * as tweetsActions from '../../actions/tweetsActions.js';
import * as navBarActions from '../../actions/navBarActions.js';
import * as slidePanelActions from '../../actions/slidePanelActions.js';
import { routeActions } from 'react-router-redux';
import { NavBar } from '../../components';

class NavBarContainer extends Component {
  _onClickSearch = () => {
    const {
      searchString,
      startDate,
      endDate,
      showAdvanced,
      fetchTweets,
      language,
      urlPush
    } = this.props;

    // check first if there is anything to search for at all
    if (!searchString.trim().length) {
      return;
    }

    const { code } = language;
    const args = {
      searchString,
      startDate: showAdvanced ? startDate : undefined,
      endDate: showAdvanced ? endDate : undefined
    };
    urlPush(`/${code}/search?${queryString.stringify(args)}`);

    fetchTweets(args);
  };

  render() {
    const {
      showSlidePanel,
      fetchTweets,
      changeValue,
      focus,
      urlPush,
      ...props
    } = this.props;

    const { showAdvanced } = props;

    return <NavBar
      {...props}
      onEnterKeyDown={this._onClickSearch}
      onClickSearch={this._onClickSearch}
      onFocus={focus}
      onClickAdvanced={() => {
        changeValue('showAdvanced', !showAdvanced);
      }}
      onClickMenu={showSlidePanel}
      onChange={changeValue}
    />;
  }
}

function mapStateToProps(state) {
  return {
    ...state.navBar,
    language: state.language
  };
}

export default connect(
  mapStateToProps,
  {
    fetchTweets: tweetsActions.fetchTweets,
    showSlidePanel: slidePanelActions.show,
    focus: navBarActions.focus,
    changeValue: navBarActions.changeValue,
    urlPush: routeActions.push
  }
)(NavBarContainer);
