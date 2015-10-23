'use strict';

var React = require('react'),
    SearchBar = require('../searchBar/searchBar.js'),
    SlidePanel = require('../sidePanel/slidePanel.js'),
    TweetsPopup = require('../tweetsPopup/tweetsPopup.js'),
    TweetsPopupStore = require('../../stores/tweetsPopupStore.js'),
    TweetsPopupActions = require('../../actions/tweetsPopupActions.js');

var Map = React.createClass({

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

    TweetsPopupStore.addChangeListener(this._TweetsPopupStoreChange);
  },

  _mapClick: function(event) {
    var lat = event.latLng.lat(),
        lng = event.latLng.lng();

    if (!this.state.showPopup) {
      TweetsPopupActions.showPopup({
        x: event.pixel.x,
        y: event.pixel.y
      });
    }

    //alert('hola');
  },

  componentDidMount: function() {
    var element = document.querySelector(this.props.selector),
        googleMap = new google.maps.Map(element, this.props.mapOptions);

    // attach event to google map click
    google.maps.event.addListener(googleMap, 'click', this._mapClick);
  },

  componentWillUnmount: function() {
    TweetsPopupStore.removeChangeListener(this._TweetsPopupStoreChange);
  },

  _TweetsPopupStoreChange: function() {
    this.setState({
      showPopup: TweetsPopupStore.isVisible(),
      popupPoint: TweetsPopupStore.getPoint()
    });
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
