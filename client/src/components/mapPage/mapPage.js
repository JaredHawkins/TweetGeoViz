'use strict';

var React = require('react'),
    toastr = require('toastr'),
    Map = require('./components/map.js'),
    SearchBar = require('./components/searchBar.js'),
    SlidePanel = require('./components/slidePanel.js'),
    DataPopup = require('./components/dataPopup.js'),

    MapActions = require('../../actions/mapActions.js'),
    TweetsActions = require('../../actions/tweetsActions.js'),
    DataPopupActions = require('../../actions/dataPopupActions.js'),
    SearchBarActions = require('../../actions/searchBarActions.js'),

    TweetsStore = require('../../stores/tweetsStore.js');

var MapPage = React.createClass({

  getInitialState: function() {
    return {
      showPopupOnClick: true,
      clickRadius: 250,
      heatMapData: TweetsStore.getHeatMapData(),
      selectedTweets: TweetsStore.getSelectedTweets(),
      searchQuery: '',
      error: {}
    }
  },

  componentWillMount: function() {
    TweetsStore.addChangeListener(this._tweetsStoreChange);
  },

  componentWillUnmount: function() {
    TweetsStore.removeChangeListener(this._tweetsStoreChange);
  },

  _tweetsStoreChange: function() {
    debugger;
    this.setState({
      heatMapData: TweetsStore.getHeatMapData(),
      selectedTweets: TweetsStore.getSelectedTweets()
    });
  },

  _searchQueryChange: function(event) {
    this.setState({
      searchQuery: event.target.value.trim()
    });
  },

  _onClickSearch: function() {
    TweetsActions.search(this.state.searchQuery);
  },

  _onFocusSearchField: function() {
    SearchBarActions.focus();
  },

  _slidePanelChange: function(event) {
    var name = event.target.name,
        value = event.target.value;

    if (name == 'clickRadius') {
      this.state[name] = parseInt(value, 10);
    } else if (name == 'showPopupOnClick') {
      this.state[name] = event.target.checked;
    }

    this.setState(this.state);
  },

  _onPopupClose: function() {
    DataPopupActions.close();
  },

  _onMapClick: function(options) {
    options = options || {};

    MapActions.click({
      point: options.point,
      lpoint: options.lpoint,
      showPopupOnClick: this.state.showPopupOnClick,
      bounds: options.bounds,
      searchQuery: this.state.searchQuery
    });
  },

  render: function() {
    return (
      <div>
        <div className='snap-drawers'>
          <div className='snap-drawer snap-drawer-left'>
            <SlidePanel
              clickRadius = {this.state.clickRadius}
              showPopupOnClick = {this.state.showPopupOnClick}
              onChange = {this._slidePanelChange} />
          </div>
        </div>

        <div className='site-wrapper snap-content'>
          <div className='site-wrapper-inner'>

            <Map
              onClick = {this._onMapClick}
              clickRadius = {this.state.clickRadius}
              heatMapData = {this.state.heatMapData} />

            <SearchBar
              searchQuery = {this.state.searchQuery}
              onChange = {this._searchQueryChange}
              onFocus = {this._onFocusSearchField}
              onClickSearch = {this._onClickSearch} />

            <DataPopup
              data = {this.state.selectedTweets}
              onClose = {this._onPopupClose} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MapPage;
