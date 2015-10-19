'use strict';

var React = require('react'),
    SearchBar = require('../searchBar/searchBar.js'),
    SlidePanel = require('../sidePanel/slidePanel.js'),
    TweetsPopup = require('../tweetsPopup/tweetsPopup.js');

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

  componentDidMount: function() {
    var element = document.querySelector(this.props.selector);
    new google.maps.Map(element, this.props.mapOptions);
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
            <TweetsPopup />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Map;
