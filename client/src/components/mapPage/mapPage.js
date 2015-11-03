'use strict';

var React = require('react'),
    toastr = require('toastr'),
    Map = require('./components/map.js'),
    SearchBar = require('./components/searchBar.js'),
    SlidePanel = require('./components/slidePanel.js'),
    DataPopup = require('./components/dataPopup.js'),
    TweetsActions = require('../../actions/tweetsActions.js'),
    TweetsStore = require('../../stores/tweetsStore.js');

var MapPage = React.createClass({

  getInitialState: function() {
    return {
      slidePanel: {
        visible: false
      },

      map: {
        isClickEnabled: true,
        isCircleVisible: false,
        clickRadius: 250
      },

      popup: {
        selectedTweets: [],
        visible: false,
        point: {
          x: -100,
          y: -100
        }
      },

      error: {},
      searchQuery: ''
    }
  },

  _searchQueryChange: function(event) {
    this.setState({
      searchQuery: event.target.value
    });
  },

  _onClickSearch: function(event) {
    TweetsActions.search(this.state.searchQuery);
  },

  _onFocusSearchField: function(event) {
    if (this.state.slidePanel.visible) {
      return;
    }

    this.state.slidePanel.visible = true;
    this.state.map.isCircleVisible = false;
    this.state.popup.visible = false;

    this.setState({
      slidePanel: this.state.slidePanel,
      map: this.state.map,
      popup: this.state.popup
    });
  },

  _slidePanelChange: function(event) {
    var name = event.target.name,
        value = event.target.value;

    if (name == 'clickRadius') {
      this.state.map[name] = parseInt(value, 10);
    } else if (name == 'isClickEnabled') {
      this.state.map[name] = event.target.checked;
    }

    this.setState({
      map: this.state.map
    });
  },

  _onPopupClose: function(event) {
    if (!this.state.popup.visible) {
      return;
    }

    this.state.popup.visible = false;
    this.state.map.isCircleVisible = false;

    this.setState({
      popup: this.state.popup,
      map: this.state.map
    });
  },

  _onMapClick: function(options) {
    options = options || {};

    if (!this.state.map.isClickEnabled) {
      if (this.state.slidePanel.visible) {
        this.state.slidePanel.visible = false;
        this.setState({
          slidePanel: this.state.slidePanel
        });
      }

      return;
    }

    if (this.state.map.isCircleVisible && this.state.popup.visible) {
      return;
    }

    this.state.slidePanel.visible = false;

    if (!this.state.map.isCircleVisible) {
      this.state.map.isCircleVisible = true;
      this.state.map.lpoint = options.lpoint;
    }

    if (!this.state.popup.visible) {
      this.state.popup.visible = true;
      this.state.popup.point = options.point;
    }

    this.setState({
      map: this.state.map,
      popup: this.state.popup,
      slidePanel: this.state.slidePanel
    });
  },

  render: function() {
    var popupHeader = this.state.popup.selectedTweets.length + ' Tweets';

    return (
      <div>
        <div className='snap-drawers'>
          <div className='snap-drawer snap-drawer-left'>
            <SlidePanel
              contentSelector = '.site-wrapper'
              visible = {this.state.slidePanel.visible}
              clickRadius = {this.state.map.clickRadius}
              isClickEnabled = {this.state.map.isClickEnabled}
              onChange = {this._slidePanelChange} />
          </div>
        </div>

        <div className='site-wrapper snap-content'>
          <div className='site-wrapper-inner'>

            <Map
              onClick = {this._onMapClick}
              isClickEnabled = {this.state.map.isClickEnabled}
              isCircleVisible = {this.state.map.isCircleVisible}
              clickRadius = {this.state.map.clickRadius}
              heatMapData = {this.state.map.heatMapData}
              lpoint = {this.state.map.lpoint} />

            <SearchBar
              searchQuery = {this.state.searchQuery}
              onChange = {this._searchQueryChange}
              onFocus = {this._onFocusSearchField}
              onClickSearch = {this._onClickSearch} />

            <DataPopup
              id = 'tweetsPopup'
              header = {popupHeader}
              data = {this.state.popup.selectedTweets}
              onClose = {this._onPopupClose}
              point = {this.state.popup.point}
              visible = {this.state.popup.visible}
              rowClass = 'tweetText'
              noDataText = 'No Tweets Found' />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MapPage;
