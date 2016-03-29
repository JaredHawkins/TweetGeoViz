import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { languages } from '../../reducers/language.js';
import * as mapActions from '../../actions/mapActions.js';
import { routeActions } from 'react-router-redux';
import { version, name } from '../../../../package.json';

import { SlidePanel } from '../../components';

class SlidePanelContainer extends Component {
  _onChange = (event) => {
    const { changeValue, urlReplace } = this.props;
    const { name, checked } = event.target;
    let { value } = event.target;

    if (name === 'selectedLanguageCode') {
      return urlReplace(`/${value}`);
    } else if (name === 'isMapClickEnabled') {
      value = checked;
    } else if (name === 'clickRadius') {
      value = parseInt(value, 10);
    }

    changeValue(name, value);
  };

  render() {
    return <SlidePanel {...this.props} onChange={this._onChange} />;
  }
}

SlidePanelContainer.propTypes = {
  visible: PropTypes.bool,
  selectedLanguage: PropTypes.object.isRequired,
  clickRadius: PropTypes.number,
  isMapClickEnabled: PropTypes.bool,
  changeValue: PropTypes.func.isRequired,
  urlReplace: PropTypes.func.isRequired
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
  };
}

export default connect(
  mapStateToProps,
  {
    changeValue: mapActions.changeValue,
    urlReplace: routeActions.replace
  }
)(SlidePanelContainer);
