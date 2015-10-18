'use strict';

var React = require('react'),
    SearchBar = require('../searchBar/searchBar.js'),
    SlidePanel = require('../sidePanel/slidePanel.js');

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
      <div id='t' className='.site-wrapper.snap-content'>
        <div id='d' className='.site-wrapper-inner'>
        <SlidePanel />
        <div id='map-canvas'>
          Loading map...
        </div>
        <SearchBar />
        </div>
      </div>
    );
  }
});

module.exports = Map;
