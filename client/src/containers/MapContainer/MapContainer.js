/* global google */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as mapActions from '../../actions/mapActions.js';
import * as dataPopupActions from '../../actions/dataPopupActions.js';
import { Map } from '../../components';

class MapContainer extends Component {
  _onClick = (lonLat, coordinate, selectedTweets) => {
    const {
      click,
      show,
      isCircleVisible,
      clickRadius,
      isMapClickEnabled
    } = this.props;

    // if we show a circle on the map already then just stop
    if (isCircleVisible) {
      return;
    }

    // do not show a popup if map click is disabled
    if (!isMapClickEnabled) {
      return;
    }

    show(coordinate);
    click(lonLat, coordinate, selectedTweets);
  };

  render() {
    const {
      click,
      show,
      ...props
    } = this.props;

    return <Map
      {...props}
      onClick={this._onClick}
    />;
  }
}

function mapStateToProps(state) {
  const KM = 1000;
  let { clickRadius } = state.map;
  const { uuid: searchUUID, tweets } = state.tweets;

  clickRadius *= KM;

  return {
    ...state.map,
    selector: '#map-canvas',
    clickRadius,
    searchUUID,
    tweets
  };
}

export default connect(
  mapStateToProps,
  {
    click: mapActions.click,
    show: dataPopupActions.show
  }
)(MapContainer);
