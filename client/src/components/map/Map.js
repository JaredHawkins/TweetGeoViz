'use strict';

var React = require('react'),
    SearchBar = require('../searchBar/searchBar.js'),
    SlidePanel = require('../sidePanel/slidePanel.js'),
    TweetsPopup = require('../tweetsPopup/tweetsPopup.js'),
    TweetsPopupStore = require('../../stores/tweetsPopupStore.js'),
    MapActions = require('../../actions/mapActions.js');

var Map = React.createClass({

  _googleMap: null,
  _mapCircle: null,

  propTypes: {
    selector: React.PropTypes.string.isRequired,
    mapOptions: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      selector: '#map-canvas',
      mapOptions: {
        center: new google.maps.LatLng(21.2125, 31.1973),
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: false
      }
    };
  },

  getInitialState: function() {
    return {
      popup: {
        visible: false,
        point: {
          x: -100,
          y: -100
        }
      },
      map: {
        clickEnabled: true,
        clickRadius: 250
      }
    }
  },

  componentWillMount: function() {
    // set default state from stores
    this.setState({
      popup: {
        visible: TweetsPopupStore.isVisible(),
        point: TweetsPopupStore.getPoint()
      }
    });

    TweetsPopupStore.addChangeListener(this._popupStateChange);
  },

  _onClick: function(event) {
    if (!this.state.map.clickEnabled) {
      return;
    }

    var lat = event.latLng.lat(),
        lng = event.latLng.lng();

    if (!this.state.popup.visible) {
      MapActions.onClick({
        x: event.pixel.x,
        y: event.pixel.y
      });
      this._showCircle(lat, lng);
    }
  },

  _showCircle: function(lat, lng) {
    this._hideCircle();

    this._mapCircle = new google.maps.Circle({
      map: this._googleMap,
      center: new google.maps.LatLng(lat, lng),
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

  componentDidMount: function() {
    var element = document.querySelector(this.props.selector),
        googleMap = new google.maps.Map(element, this.props.mapOptions);

    // attach event to google map click
    google.maps.event.addListener(googleMap, 'click', this._onClick);

    this._googleMap = googleMap;
  },

  componentWillUnmount: function() {
    TweetsPopupStore.removeChangeListener(this._popupStateChange);
  },

  _getClickRadiusMeters: function() {
    var km = 1000;
    return this.state.map.clickRadius * km;
  },

  _popupStateChange: function() {
    this.setState({
      popup: {
        visible: TweetsPopupStore.isVisible(),
        point: TweetsPopupStore.getPoint()
      }
    });

    if (!TweetsPopupStore.isVisible()) {
      this._hideCircle();
    }
  },

  _setMapState: function(event) {
    var field = event.target.name,
        value = event.target.value;

    if (field == 'clickRadius') {
      value = parseInt(value, 10);
    } else if (field == 'clickEnabled') {
      value = event.target.checked;
    }

    this.state.map[field] = value;
    return this.setState({ map: this.state.map });
  },

  render: function() {
    return (
      <div>
        <div className='snap-drawers'>
          <div className='snap-drawer snap-drawer-left'>
            <SlidePanel
              contentSelector='.site-wrapper'
              mapClickEnabled={this.state.map.clickEnabled}
              clickRadius={this.state.map.clickRadius}
              onChange={this._setMapState} />
          </div>
        </div>

        <div className='site-wrapper snap-content'>
          <div className='site-wrapper-inner'>
            <div id='map-canvas'>
              Loading map...
            </div>
            <SearchBar />
            <TweetsPopup
              visible={this.state.popup.visible}
              point={this.state.popup.point} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Map;
