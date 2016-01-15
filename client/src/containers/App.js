// webpack specific - including required JS and CSS files
require('../../../node_modules/toastr/toastr.scss');
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/bootstrap/dist/js/bootstrap.min.js');

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

import { paths } from '../config/config.json';

import SearchBarContainer from './SearchBarContainer.js';
import DataPopupContainer from './DataPopupContainer.js';
import MapContainer from './MapContainer.js';
import SlidePanelContainer from './SlidePanelContainer.js';

import { noError } from '../actions/mapActions.js';
import { routeActions } from 'redux-simple-router';

import { validLanguageCode } from '../reducers/language.js';

class App extends Component {

  componentWillMount = () => {
    const { urlReplace } = this.props;

    // get language from URL
    let { languageCode } = this.props.params;
    const { code: stateLanguageCode } = this.props.language;

    // if language code is valid then do not worry about it
    if (validLanguageCode(languageCode)) {
      return;
    }

    urlReplace(paths.urlBase + stateLanguageCode);
  };

  render() {
    const {
      error
    } = this.props;

    if (error) {
      toastr.error(error);
      noError();
    }

    return (
      <div className='container-fluid'>
        <div className='snap-drawers'>
          <div className='snap-drawer snap-drawer-left'>
            <SlidePanelContainer />
          </div>
        </div>

        <div className='site-wrapper snap-content'>
          <div className='site-wrapper-inner'>

            <MapContainer />

            <SearchBarContainer />

            <DataPopupContainer />
          </div>
        </div>
      </div>
    );
  }
};

App.propTypes = {
  error: PropTypes.string,
  language: PropTypes.object
};

function mapStateToProps(state) {
  const { error } = state.map;
  const language = state.language;

  return {
    error,
    language
  }
}

export default connect(
  mapStateToProps,
  {
    noError,
    urlReplace: routeActions.replace
  }
)(App);
