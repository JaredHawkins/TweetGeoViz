/* global google */

// webpack specific - including required JS and CSS files
import './map.less';
import '../../../../node_modules/openlayers/dist/ol-debug.css';
import ol from '../../../../node_modules/openlayers/dist/ol-debug.js';
import React, { Component, PropTypes } from 'react';

import { getHeatMapLayer, getClusterLayer } from '../../reducers/tweets.js';

class Map extends Component {
  componentDidMount() {
    const {
      selector,
      mapOptions,
      isCircleVisible,
      onClick
    } = this.props;

    const raster = new ol.layer.Tile({ source: new ol.source.OSM() });

    this._map = new ol.Map({
      layers: [raster],
      renderer: 'canvas',
      target: 'map-canvas',
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

  componentDidUpdate(prevProps) {
    const {
      isCircleVisible,
      searchUUID,
      tweets
    } = this.props;

    // work with map circle only if its property has changed
    if (prevProps.isCircleVisible !== isCircleVisible) {
      this._toggleCircle(isCircleVisible);
    }

    // re-render heatmap only if search was changed
    if (prevProps.searchUUID !== searchUUID) {
      this._map.addLayer(getHeatMapLayer(tweets));
      this._map.addLayer(getClusterLayer(tweets));
    }
  }

  _showCircle = () => {
    const { lpoint: { lat, lng }, clickRadius } = this.props;

    this._hideCircle();

    this._mapCircle = new google.maps.Circle({
      map: this._googleMap,
      center: new google.maps.LatLng(lat, lng),
      clickable: false,
      radius: clickRadius,
      fillColor: '#fff',
      fillOpacity: 0.6,
      strokeColor: '#313131',
      strokeOpacity: 0.4,
      strokeWeight: 0.8
    });

    this._googleMap.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      panControl: false,
      disableDoubleClickZoom: true
    });
  };

  _hideCircle = () => {
    if (!this._mapCircle) {
      return;
    }

    this._mapCircle.setMap(null);
    this._googleMap.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      panControl: true,
      disableDoubleClickZoom: false
    });
  };

  _toggleCircle = isCircleVisible => {
    this[isCircleVisible ? '_showCircle' : '_hideCircle']();
  };

  render() {
    return <div id="map-canvas"></div>;
  }
}

Map.propTypes = {
  isCircleVisible: PropTypes.bool,
  lpoint: PropTypes.object,
  selector: PropTypes.string,
  clickRadius: PropTypes.number,
  searchUUID: PropTypes.string,
  mapOptions: PropTypes.object,
  onClick: PropTypes.func
};

export default Map;
