'use strict';

var React = require('react'),
    MapStore = require('../../../stores/mapStore.js');

var Map = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired,
    selector: React.PropTypes.string,
    clickRadius: React.PropTypes.number,
    heatMapData: React.PropTypes.array,
    mapOptions: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      isCircleVisible: MapStore.isCircleVisible(),
      lpoint: MapStore.getLPoint()
    }
  },

  getDefaultProps: function() {
    return {
      clickRadius: 250,
      heatMapData: [],
      selector: '#map-canvas',
      mapOptions: {
        center: new google.maps.LatLng(21.2125, 31.1973),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
      }
    };
  },

  componentWillMount: function() {
    MapStore.addChangeListener(this._mapStoreChange);
  },

  componentWillUnmount: function() {
    MapStore.removeChangeListener(this._mapStoreChange);
  },

  _mapStoreChange: function() {
    this.setState({
      isCircleVisible: MapStore.isCircleVisible(),
      lpoint: MapStore.getLPoint()
    });
  },

  componentDidMount: function() {
    var element = document.querySelector(this.props.selector);

    this._googleMap = new google.maps.Map(element, this.props.mapOptions);

    // attach event to google map click
    google.maps.event.addListener(this._googleMap, 'click', this._onClick);

    this._renderHeatMap(this.props.heatMapData);
    this._toggleCircle(this.state.isCircleVisible);
  },

  componentDidUpdate: function() {
    debugger;
    this._toggleCircle();
    this._renderHeatMap(this.props.heatMapData);
  },

  _onClick: function(event) {
    var bounds = new google.maps.Circle({
      center: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
      radius: this._getClickRadiusMeters()
    }).getBounds();

    this.props.onClick({
      point: {
        x: event.pixel.x,
        y: event.pixel.y
      },
      lpoint: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      },
      bounds: bounds
    });
  },

  _getClickRadiusMeters: function() {
    var km = 1000;
    return this.props.clickRadius * km;
  },

  _showCircle: function() {
    var lpoint = this.state.lpoint;

    this._hideCircle();

    this._mapCircle = new google.maps.Circle({
      map: this._googleMap,
      center: new google.maps.LatLng(lpoint.lat, lpoint.lng),
      clickable: false,
      radius: this._getClickRadiusMeters(),
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
  },

  _hideCircle: function() {
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
  },

  _toggleCircle: function() {
    if (this.state.isCircleVisible) {
      this._showCircle();
    } else {
      this._hideCircle();
    }
  },

  _renderHeatMap: function(heatMapData) {
    heatMapData = heatMapData || [];

    // remove old heatmap if it was present
    if (this._heatMap) {
      this._heatMap.setMap(null);
    }

    if (!heatMapData.length) {
      return;
    }

    this._heatMap = new google.maps.visualization.HeatmapLayer({
      data: heatMapData,
      dissipating: false,
      radius: 5,
      map: this._googleMap
    });
  },

  render: function() {
    return (
      <div id='map-canvas'>
        Loading map...
      </div>
    );
  }
});

module.exports = Map;
