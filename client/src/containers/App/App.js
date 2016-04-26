// webpack specific - including required JS and CSS files
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  SearchBarContainer,
  NavBarContainer,
  DataPopupContainer,
  MapContainer,
  SlidePanelContainer,
  ToasterContainer
} from '../';
import { routeActions } from 'react-router-redux';
import * as tweetsActions from '../../actions/tweetsActions.js';
import { validLanguageCode } from '../../reducers/language.js';

class App extends Component {
  componentWillMount() {
    const {
      urlReplace,
      fetchTweets,
      routing,
      params,
      language
    } = this.props;

    // get language from URL
    const { query = {} } = routing.location;
    const { languageCode } = params;
    const { code: stateLanguageCode } = language;

    // if language code is valid then do not worry about it
    if (!validLanguageCode(languageCode)) {
      return urlReplace(`/${stateLanguageCode}`);
    }

    const {
      searchString,
      startDate,
      endDate
    } = query;

    if (!searchString || !searchString.length) {
      return;
    }

    fetchTweets({
      searchString,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    });
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        <SlidePanelContainer />
        <MapContainer />
        <DataPopupContainer />
        <ToasterContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.language,
    routing: state.routing
  };
}

export default connect(
  mapStateToProps,
  {
    urlReplace: routeActions.replace,
    fetchTweets: tweetsActions.fetchTweets
  }
)(App);
