'use strict';

var React = require('react');

var Map = React.createClass({
  propTypes: {
    isCircleVisible: React.PropTypes.bool,
    point: React.PropTypes.object,
    onClick: React.PropTypes.func.isRequired,
    selector: React.PropTypes.string,
    clickRadius: React.PropTypes.number,
    heatMapData: React.PropTypes.array,
    searchUUID: React.PropTypes.string,
    mapOptions: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      isCircleVisible: false,
      lpoint: {
        lat: 0,
        lng: 0
      },
      clickRadius: 250,
      heatMapData: [],
      selector: '#map-canvas',
      mapOptions: {
        center: new google.maps.LatLng(21.2125, 31.1973),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
      },
      searchUUID: undefined
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

  componentDidUpdate: function(prevProps) {
    //debugger;

    // work with map circle only if its property has changed
    if (prevProps.isCircleVisible !== this.props.isCircleVisible) {
      this._toggleCircle();
    }

    // re-render heatmap only if search was changed
    if (prevProps.searchUUID !== this.props.searchUUID) {
      this._renderHeatMap(this.props.heatMapData);
    }
  },

  _onClick: function(event) {
    // get bounds for the click
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

  _toggleCircle: function() {
    if (this.props.isCircleVisible) {
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
