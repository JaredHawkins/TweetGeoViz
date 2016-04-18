/* global google */

// webpack specific - including required JS and CSS files
import './map.less';
import '../../../../node_modules/openlayers/dist/ol-debug.css';
import ol from '../../../../node_modules/openlayers/dist/ol-debug.js';
import React, { Component, PropTypes } from 'react';

class Map extends Component {
  componentDidMount() {
    const {
      selector,
      mapOptions,
      heatMapData,
      isCircleVisible,
      onClick
    } = this.props;
    const element = document.querySelector(selector);

    //this._googleMap = new google.maps.Map(element, mapOptions);

    // attach event to google map click
    //google.maps.event.addListener(this._googleMap, 'click', onClick);

    //this._renderHeatMap(heatMapData);
    //this._toggleCircle(isCircleVisible);

    // this._map = new ol.Map({
    //   view: new ol.View({
    //     center: [0, 0],
    //     zoom: 1
    //   }),
    //   layers: [
    //     new ol.layer.Tile({
    //       source: new ol.source.OSM()
    //     })
    //   ],
    //   target: element,
    //   renderer: 'canvas',
    //   loadTilesWhileAnimating: true,
    //   loadTilesWhileInteracting: true
    // });

    var raster = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

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
      heatMapData
    } = this.props;

    // work with map circle only if its property has changed
    if (prevProps.isCircleVisible !== isCircleVisible) {
      this._toggleCircle(isCircleVisible);
    }

    // re-render heatmap only if search was changed
    if (prevProps.searchUUID !== searchUUID) {
      this._renderHeatMap(heatMapData);
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

  _renderHeatMap = (heatMapData = []) => {
    debugger;

    // remove old heatmap if it was present
    if (this._heatMap) {
      this._map.removeLayer(this._heatMap);
      this._heatMap = undefined;
    }

    if (!heatMapData.length) {
      return;
    }

    const features = heatMapData.map(item => {
      return new ol.Feature(
        new ol.geom.Point([item.lng(), item.lat()]).transform('EPSG:4326', 'EPSG:3857')
      );
    });

    // var count = 20000;
    // var features = new Array(count);
    // var e = 4500000;
    // for (var i = 0; i < count; ++i) {
    //   var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
    //   features[i] = new ol.Feature(new ol.geom.Point(coordinates));
    // }

    var source = new ol.source.Vector({
      features: features
    });

    var clusterSource = new ol.source.Cluster({
      distance: 40,
      source: source
    });

    var styleCache = {};
    var clusters = new ol.layer.Vector({
      source: clusterSource,
      style: function(feature) {
        var size = feature.get('features').length;
        var style = styleCache[size];
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

    debugger;

    //this._map.addLayer(clusters);

    // var raster = new ol.layer.Tile({
    //   source: new ol.source.OSM()
    // });

    // var map = new ol.Map({
    //   layers: [raster, clusters],
    //   renderer: 'canvas',
    //   target: 'map-canvas',
    //   view: new ol.View({
    //     center: [0, 0],
    //     zoom: 2
    //   })
    // });

    this._heatMap = new ol.layer.Heatmap({
      source: new ol.source.Vector({
        features
      }),
      blur: 15,
      radius: 8,
      opacity: 0.2,
      weight: () => 1.0
    });

    this._map.addLayer(this._heatMap);

    // this._heatMap = new google.maps.visualization.HeatmapLayer({
    //   data: heatMapData,
    //   dissipating: false,
    //   radius: 5,
    //   map: this._googleMap
    // });
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
  heatMapData: PropTypes.array,
  searchUUID: PropTypes.string,
  mapOptions: PropTypes.object,
  onClick: PropTypes.func
};

export default Map;
