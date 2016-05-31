/* global google */

// webpack specific - including required JS and CSS files
import './map.less';
import '../../../../node_modules/openlayers/dist/ol-debug.css';
import ol from '../../../../node_modules/openlayers/dist/ol-debug.js';
import React, { Component, PropTypes } from 'react';
import {
  HEATMAP_LAYER_NAME,
  CLUSTER_LAYER_NAME
} from '../../reducers/map.js';

const epsg4326 = 'EPSG:4326';
const epsg3857 = 'EPSG:3857';

class Map extends Component {
  componentDidMount() {
    const {
      selectedLayer
    } = this.props;

    // Layers
    this._rasterLayer = this._createTileLayer();
    this._heatMapLayer = this._createHeatMapLayer();
    this._clusterLayer = this._createClusterLayer();
    this._selectCircleLayer = this._createSelectCircleLayer();

    // overlay popup
    this._popupOverlay = new ol.Overlay({
      element: document.getElementById('tweetsPopup'),
      positioning: 'top-left',
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
        this._clusterLayer,
        this._selectCircleLayer
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
    this._showLayer(selectedLayer);
  }

  componentDidUpdate(prevProps) {
    const {
      isCircleVisible,
      searchUUID,
      tweets,
      selectedLayer,
      coordinate
    } = this.props;

    // work with map circle only if its property has changed
    if (prevProps.isCircleVisible !== isCircleVisible) {
      this._toggleCircle(isCircleVisible);
    }

    // re-render heatmap only if search was changed
    if (prevProps.searchUUID !== searchUUID) {
      const vectorSource = this._getMapVectorSource(tweets);
      this._heatMapLayer.setSource(vectorSource);
      this._clusterLayer.setSource(new ol.source.Cluster({
        source: vectorSource,
        distance: 40
      }));
    }

    // show-hide layers
    if (prevProps.selectedLayer !== selectedLayer) {
      this._showLayer(selectedLayer);
    }

    // change popup position
    if (prevProps.coordinate !== coordinate) {
      this._popupOverlay.setPosition(coordinate);
    }
  }

  _mapOnClick = (event) => {
    const { onClick, clickRadius } = this.props;

    const { coordinate } = event;
    const lonLat = ol.proj.transform(coordinate, epsg3857, epsg4326);

    // TBD: we need to move this logic somewhere else
    // get tweets which are in the selection circle
    const mainSource = this._heatMapLayer.getSource() || new ol.source.Vector();
    const circleSource = this._getCircleVectorSource(lonLat, coordinate, clickRadius);
    const selectedFeatures = mainSource.getFeaturesInExtent(circleSource.getExtent());
    const selectedTweets = selectedFeatures.map(feature => {
      return {
        id: feature.getId(),
        timeStamp: feature.getProperties().timeStamp,
        text: feature.getProperties().text
      };
    });

    onClick(lonLat, coordinate, selectedTweets);
  };

  _createTileLayer = () => {
    return new ol.layer.Tile({ source: new ol.source.OSM() });
  };

  _createHeatMapLayer = (options = {}) => {
    return new ol.layer.Heatmap({
      title: HEATMAP_LAYER_NAME,
      blur: 15,
      radius: 8,
      opacity: 0.2,
      weight: () => 1.0
    });
  };

  _createClusterLayer = () => {
    let styleCache = {};
    return new ol.layer.Vector({
      title: CLUSTER_LAYER_NAME,
      style: feature => {
        // TBD: change radius and color based on how many tweets are there
        const size = feature.get('features').length;
        let style = styleCache[size];
        if (!style) {
          style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 12,
              stroke: new ol.style.Stroke({
                color: 'rgba(51, 153, 204, 0.5)',
                width: 10
              }),
              fill: new ol.style.Fill({
                color: 'rgb(51, 153, 204)'
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

  _createSelectCircleLayer = () => {
    return new ol.layer.Vector({
      style: [
        new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: 'rgb(0, 204, 255)',
            width: 1
          }),
          fill: new ol.style.Fill({
            color: 'rgba(0, 204, 255, 0.2)'
          })
        })
      ]
    });
  };

  _getMapVectorSource = (geoJSON = []) => {
    return new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(geoJSON, {
        featureProjection: epsg3857,
        dataProjection: epsg4326,
      })
    });
  };

  _getCircleVectorSource = (lonLat, coordinate, clickRadius) => {
    const [ lon, lat ] = lonLat;

    const precisionCircle = ol.geom.Polygon.circular(
      /* WGS84 Sphere */
      new ol.Sphere(6378137),
      /* Center */
      lonLat,
      /* Radius */
      clickRadius,
      /* Number of verticies */
      64
    ).transform(epsg4326, epsg3857);

    const precisionCircleFeature = new ol.Feature(precisionCircle)
    const vectorSource = new ol.source.Vector();
    vectorSource.addFeature(precisionCircleFeature);

    return vectorSource;
  };

  _showLayer = (selectedLayer) => {
    this._clusterLayer.setVisible(false);
    this._heatMapLayer.setVisible(false);

    this._map.getLayers()
      .item(selectedLayer)
      .setVisible(true);
  };

  _showCircle = () => {
    const {
      lonLat,
      coordinate,
      clickRadius
    } = this.props;

    const vectorSource =
      this._getCircleVectorSource(lonLat, coordinate, clickRadius);

    this._selectCircleLayer.setSource(vectorSource);
  };

  _hideCircle = () => {
    this._selectCircleLayer.setSource();
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
