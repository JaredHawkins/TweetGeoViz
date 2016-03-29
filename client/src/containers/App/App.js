// webpack specific - including required JS and CSS files
require('../../../../node_modules/toastr/toastr.scss');
require('../../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../../node_modules/bootstrap/dist/js/bootstrap.min.js');

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  SearchBarContainer,
  DataPopupContainer,
  MapContainer,
  SlidePanelContainer
} from '../';

import { routeActions } from 'react-router-redux';
import { validLanguageCode } from '../../reducers/language.js';

class App extends Component {
  componentWillMount = () => {
    const { urlReplace } = this.props;

    // get language from URL
    const { languageCode } = this.props.params;
    const { code: stateLanguageCode } = this.props.language;

    // if language code is valid then do not worry about it
    if (validLanguageCode(languageCode)) {
      return;
    }

    urlReplace(`/${stateLanguageCode}`);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="snap-drawers">
          <div className="snap-drawer snap-drawer-left">
            <SlidePanelContainer />
          </div>
        </div>

        <div className="site-wrapper snap-content">
          <div className="site-wrapper-inner">

            <MapContainer />

            <SearchBarContainer />

            <DataPopupContainer />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  error: PropTypes.string,
  params: PropTypes.object.isRequired,
  language: PropTypes.object,
  urlReplace: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

export default connect(
  mapStateToProps,
  {
    urlReplace: routeActions.replace
  }
)(App);
