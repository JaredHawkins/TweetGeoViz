/* global google */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as mapActions from '../../actions/mapActions.js';
import * as dataPopupActions from '../../actions/dataPopupActions.js';
import { Map } from '../../components';

class MapContainer extends Component {
  _onClick = (event) => {
    const {
      click,
      show,
      isCircleVisible,
      clickRadius,
      isMapClickEnabled
    } = this.props;

    const { latLng, pixel } = event;

    // if we show a circle on the map already then just stop
    if (isCircleVisible) {
      return;
    }

    // get bounds for the click
    const bounds = new google.maps.Circle({
      center: new google.maps.LatLng(latLng.lat(), latLng.lng()),
      radius: clickRadius
    }).getBounds();

    click(bounds, {
      lat: latLng.lat(),
      lng: latLng.lng()
    });

    // do not show a popup if map click is disabled
    if (!isMapClickEnabled) {
      return;
    }

    show({
      x: pixel.x,
      y: pixel.y
    });
  };

  render() {
    const {
      ...props,
      click,
      show
    } = this.props;

    return <Map {...props}
      onClick={this._onClick}
    />;
  }
}

function mapStateToProps(state) {
  const KM = 1000;
  let { clickRadius } = state.map;
  const { uuid: searchUUID, heatMapData } = state.tweets;

  clickRadius *= KM;

  return {
    ...state.map,
    selector: '#map-canvas',
    clickRadius,
    searchUUID,
    heatMapData
  };
}

export default connect(
  mapStateToProps,
  {
    click: mapActions.click,
    show: dataPopupActions.show
  }
)(MapContainer);
