'use strict';

var React = require('react');

var Map = React.createClass({
  propTypes: {
    selector:  React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,

    isClickEnabled: React.PropTypes.bool,
    isCircleVisible:  React.PropTypes.bool,
    clickRadius:  React.PropTypes.number,
    heatMapData:  React.PropTypes.array,
    mapOptions: React.PropTypes.object,
    lpoint: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      isClickEnabled: true,
      isCircleVisible: false,
      clickRadius: 250,
      heatMapData: [],
      selector: '#map-canvas',
      mapOptions: {
        center: new google.maps.LatLng(21.2125, 31.1973),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
      },
      lpoint: {
        lat: 0,
        lng: 0
      }
    };
  },

  componentDidMount: function() {
    var element = document.querySelector(this.props.selector);

    this._googleMap = new google.maps.Map(element, this.props.mapOptions);

    // attach event to google map click
    google.maps.event.addListener(this._googleMap, 'click', this._onClick);

    this._renderHeatMap(this.props.heatMapData);
    this._toggleCircle(this.props.isCircleVisible);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    this._toggleCircle(nextProps.isCircleVisible);

    // we never need to rerender our map
    return false;
  },

  _onClick: function(event) {
    this.props.onClick({
      point: {
        x: event.pixel.x,
        y: event.pixel.y
      },
      lpoint: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    });
  },

  _getClickRadiusMeters: function() {
    var km = 1000;
    return this.props.clickRadius * km;
  },

  _showCircle: function() {
    var lpoint = this.props.lpoint;

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

  _toggleCircle: function(visible) {
    if (visible) {
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
