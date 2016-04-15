import React, { Component } from 'react';
import { connect } from 'react-redux';
import { languages } from '../../reducers/language.js';
import * as mapActions from '../../actions/mapActions.js';
import * as dataPopupActions from '../../actions/dataPopupActions.js';
import { routeActions } from 'react-router-redux';
import { version, name } from '../../../../package.json';

import { SlidePanel } from '../../components';

class SlidePanelContainer extends Component {
  render() {
    const {
      ...props,
      changeValue,
      changeDataPopupValue,
      urlReplace
    } = this.props;

    return <SlidePanel {...props}
      onChange={(name, value) => {
        if (name === 'selectedLanguageCode') {
          return urlReplace(`/${value}`);
        }

        if (name === 'showFilter' || name === 'showTimeStamps') {
          return changeDataPopupValue(name, value);
        }

        changeValue(name, value);
      }}
    />;
  }
}

function mapStateToProps(state) {
  const { visible } = state.slidePanel;
  const selectedLanguage = state.language;
  const { clickRadius, isMapClickEnabled } = state.map;
  const { showFilter, showTimeStamps } = state.dataPopup;

  return {
    header: name,
    contentSelector: '.site-wrapper',
    languages,
    version,
    visible,
    selectedLanguage,
    clickRadius,
    isMapClickEnabled,
    showFilter,
    showTimeStamps
  };
}

export default connect(
  mapStateToProps,
  {
    changeValue: mapActions.changeValue,
    changeDataPopupValue: dataPopupActions.changeValue,
    urlReplace: routeActions.replace
  }
)(SlidePanelContainer);
