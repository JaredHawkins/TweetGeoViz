'use strict';

var React = require('react'),
    toastr = require('toastr'),
    SearchBar = require('../searchBar/searchBar.js'),
    SlidePanel = require('../sidePanel/slidePanel.js'),
    TweetsPopup = require('./components/tweetsPopup.js'),
    TweetsPopupStore = require('../../stores/tweetsPopupStore.js'),
    TweetsActions = require('../../actions/tweetsActions.js'),
    TweetsStore = require('../../stores/tweetsStore.js'),
    MapStore = require('../../stores/mapStore.js'),
    MapActions = require('../../actions/mapActions.js');

var MapPage = React.createClass({

  _googleMap: null,
  _heatMap: null,
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
      error: null,
      selectedTweets: [],
      heatMapData: [],
      searchQuery: '',
      lastQuerySearch: '',
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
      error: MapStore.getError(),
      popup: {
        visible: TweetsPopupStore.isVisible(),
        point: TweetsPopupStore.getPoint()
      },
      heatMapData: MapStore.getHeatMapData(),
      searchQuery: MapStore.getSearchQuery()
    });

    TweetsPopupStore.addChangeListener(this._popupStateChange);
    MapStore.addChangeListener(this._mapStateChange);
  },

  _onClick: function(event) {
    if (!this.state.map.clickEnabled) {
      return;
    }

    if (this.state.popup.visible) {
      return;
    }

    MapActions.onClick({
      point: {
        x: event.pixel.x,
        y: event.pixel.y
      },
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
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

  componentDidMount: function() {
    var element = document.querySelector(this.props.selector),
        googleMap = new google.maps.Map(element, this.props.mapOptions);

    // attach event to google map click
    google.maps.event.addListener(googleMap, 'click', this._onClick);

    this._renderHeatMap(this.state.heatMapData);

    this._googleMap = googleMap;
  },

  componentWillUnmount: function() {
    TweetsPopupStore.removeChangeListener(this._popupStateChange);
    MapStore.removeChangeListener(this._mapStateChange);
  },

  _getClickRadiusMeters: function() {
    var km = 1000;
    return this.state.map.clickRadius * km;
  },

  _popupStateChange: function() {
    var selectedTweets = [];

    if (!TweetsPopupStore.isVisible()) {
      this._hideCircle();
      selectedTweets = [];
    } else {
      this._showCircle(TweetsPopupStore.getLat(), TweetsPopupStore.getLng());
      selectedTweets = TweetsStore.getTweetsInBounds(
        this._mapCircle.getBounds());
    }

    this.setState({
      selectedTweets: selectedTweets,
      popup: {
        visible: TweetsPopupStore.isVisible(),
        point: TweetsPopupStore.getPoint()
      }
    });
  },

  _mapStateChange: function() {
    var error = MapStore.getError(),
        heatMapData = MapStore.getHeatMapData(),
        searchQuery = MapStore.getSearchQuery();

    if (error) {
      toastr.error(error);
      return;
    }

    this._renderHeatMap(heatMapData);

    this.setState({
      error: error,
      heatMapData: heatMapData
    });
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

  _searchQueryChange: function(event) {
    this.setState({
      searchQuery: event.target.value
    });
  },

  _searchClick: function(event) {
    // this is bad. need to move it to store instead
    this.setState({
      lastQuerySearch: this.state.searchQuery
    });
    TweetsActions.search(this.state.searchQuery);
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
            <SearchBar
              searchQuery={this.state.searchQuery}
              onChange={this._searchQueryChange}
              onClick={this._searchClick} />
            <TweetsPopup
              data={this.state.selectedTweets}
              visible={this.state.popup.visible}
              searchQuery={this.state.lastQuerySearch}
              point={this.state.popup.point} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MapPage;
