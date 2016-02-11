import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { languages } from '../reducers/language.js';
import { changeValue } from '../actions/mapActions.js';
import { routeActions } from 'redux-simple-router';
import SlidePanel from '../components/SlidePanel/SlidePanel.js';

import { paths } from '../config/config.json';
import { version, name } from '../../../package.json';

class SlidePanelContainer extends Component {
  _onChange = event => {
    const { changeValue } = this.props;
    const { urlReplace } = this.props;
    let { name, value, checked } = event.target;

    if (name === 'selectedLanguageCode') {
      return urlReplace(paths.urlBase + value);
    }

    if (name === 'isMapClickEnabled') {
      value = checked;
    }
    else if (name === 'clickRadius') {
      value = parseInt(value, 10);
    }

    changeValue(name, value);
  };

  render() {
    return <SlidePanel {...this.props}
      onChange={this._onChange} />;
  }
};

SlidePanelContainer.propTypes = {
  visible: PropTypes.bool,
  selectedLanguage: PropTypes.object.isRequired,
  clickRadius: PropTypes.number,
  isMapClickEnabled: PropTypes.bool
};

function mapStateToProps(state) {
  const { visible } = state.slidePanel;
  const selectedLanguage = state.language;
  const { clickRadius, isMapClickEnabled } = state.map;

  return {
    header: name,
    contentSelector: '.site-wrapper',
    languages,
    version,
    visible,
    selectedLanguage,
    clickRadius,
    isMapClickEnabled
  }
}

export default connect(
  mapStateToProps,
  {
    changeValue,
    urlReplace: routeActions.replace
  }
)(SlidePanelContainer);
