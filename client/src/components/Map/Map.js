/* global google */

// webpack specific - including required JS and CSS files
import './map.less';
import '../../../../node_modules/openlayers/dist/ol-debug.css';
import ol from '../../../../node_modules/openlayers/dist/ol-debug.js';
import React, { Component, PropTypes } from 'react';

class Map extends Component {
  componentDidMount() {
    const {
      selectedLayer
    } = this.props;

    // Layers
    this._rasterLayer = this._createTileLayer();
    this._heatMapLayer = this._createHeatMapLayer();
    this._clusterLayer = this._createClusterLayer();

    // overlay popup
    this._popupOverlay = new ol.Overlay({
      element: document.getElementById('tweetsPopup'),
      positioning: 'top-center',
      stopEvent: false,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    // render Map
    this._map = new ol.Map({
      renderer: 'canvas',
      target: 'map-canvas',
      overlays: [this._popupOverlay],
      layers: [
        this._rasterLayer,
        this._heatMapLayer,
        this._clusterLayer
      ],
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      }),
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true
    });

    this._map.on('click', this._mapOnClick);

    // show only a specific layer we need
    this._hideLayers();
    this._showLayer(selectedLayer);
  }

  componentDidUpdate(prevProps) {
    const {
      isCircleVisible,
      searchUUID,
      tweets,
      selectedLayer
    } = this.props;

    // work with map circle only if its property has changed
    if (prevProps.isCircleVisible !== isCircleVisible) {
      this._toggleCircle(isCircleVisible);
    }

    // re-render heatmap only if search was changed
    if (prevProps.searchUUID !== searchUUID) {
      const vectorSource = this._getVectorSource(tweets);
      this._heatMapLayer.setSource(vectorSource);
      this._clusterLayer.setSource(new ol.source.Cluster({
        source: vectorSource,
        distance: 40
      }));
    }

    // show-hide layers
    if (prevProps.selectedLayer !== selectedLayer) {
      this._hideLayers();
      this._showLayer(selectedLayer);
    }
  }

  shouldComponentUpdate() {
    // do not rerender this component since render method does not really change
    return false;
  }

  _mapOnClick = (event) => {
    const { onClick } = this.props;

    const { coordinate } = event;
    this._popupOverlay.setPosition(coordinate);
    onClick(event);
  };

  _createTileLayer = () => {
    return new ol.layer.Tile({ source: new ol.source.OSM() });
  };

  _createHeatMapLayer = (options = {}) => {
    return new ol.layer.Heatmap({
      title: 'HeatMap',
      blur: 15,
      radius: 8,
      opacity: 0.2,
      weight: () => 1.0
    });
  };

  _createClusterLayer = () => {
    let styleCache = {};
    return new ol.layer.Vector({
      title: 'Clusters',
      style: feature => {
        const size = feature.get('features').length;
        let style = styleCache[size];
        if (!style) {
          style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 10,
              stroke: new ol.style.Stroke({
                color: '#fff'
              }),
              fill: new ol.style.Fill({
                color: '#3399CC'
              })
            }),
            text: new ol.style.Text({
              text: size.toString(),
              fill: new ol.style.Fill({
                color: '#fff'
              })
            })
          });
          styleCache[size] = style;
        }
        return style;
      }
    });
  };

  _getVectorSource = (geoJSON = []) => {
    return new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(geoJSON, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
    });
  };

  _hideLayers = () => {
    const [, ...layers] = this._map.getLayers().getArray();
    layers.forEach(layer => layer.setVisible(false));
  };

  _showLayer = (selectedLayer) => {
    this._map.getLayers()
      .item(selectedLayer)
      .setVisible(true);
  };

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
