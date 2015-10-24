'use strict';

var React = require('react'),
    SearchBar = require('../searchBar/searchBar.js'),
    SlidePanel = require('../sidePanel/slidePanel.js'),
    TweetsPopup = require('../tweetsPopup/tweetsPopup.js'),
    TweetsPopupStore = require('../../stores/tweetsPopupStore.js'),
    MapActions = require('../../actions/mapActions.js'),
    MapStore = require('../../stores/mapStore.js');

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
      showPopup: false,
      popupPoint: {
        x: -100,
        y: -100
      }
    }
  },

  componentWillMount: function() {
    this.setState({
      showPopup: TweetsPopupStore.isVisible(),
      popupPoint: TweetsPopupStore.getPoint()
    });

    TweetsPopupStore.addChangeListener(this._tweetsPopupStoreChange);
  },

  _onClick: function(event) {
    var lat = event.latLng.lat(),
        lng = event.latLng.lng();

    if (!this.state.showPopup) {
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
      radius: MapStore.getClickRadiusMeters(),
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
    TweetsPopupStore.removeChangeListener(this._tweetsPopupStoreChange);
  },

  _tweetsPopupStoreChange: function() {
    this.setState({
      showPopup: TweetsPopupStore.isVisible(),
      popupPoint: TweetsPopupStore.getPoint()
    });

    if (!TweetsPopupStore.isVisible()) {
      this._hideCircle();
    }
  },

  render: function() {
    return (
      <div>
        <div className='snap-drawers'>
          <div className='snap-drawer snap-drawer-left'>
            <SlidePanel />
          </div>
        </div>

        <div className='site-wrapper snap-content'>
          <div className='site-wrapper-inner'>
            <div id='map-canvas'>
              Loading map...
            </div>
            <SearchBar />
            <TweetsPopup
              visible={this.state.showPopup}
              point={this.state.popupPoint} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Map;
