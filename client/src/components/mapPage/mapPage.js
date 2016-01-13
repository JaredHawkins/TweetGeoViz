// webpack specific - including required JS and CSS files
require('../../../../node_modules/toastr/toastr.scss');

import React, { Component, PropTypes } from 'react';
import toastr from 'toastr';

import { paths } from '../../config/config.json';
import history from '../../history.js';

import Map from './components/map.js';
import SearchBar from './components/searchBar.js';
import SlidePanel from './components/slidePanel.js';
import DataPopup from './components/dataPopup.js';

import * as MapActions from '../../actions/mapActions.js';
import * as TweetsActions from '../../actions/tweetsActions.js';
import * as PopupActions from '../../actions/dataPopupActions.js';
import * as SearchBarActions from '../../actions/searchBarActions.js';
import * as SlidePanelActions from '../../actions/slidePanelActions.js';
import * as LanguageActions from '../../actions/languageActions.js';

import store from '../../stores/appStore.js';
import { languages, defaultLanguage } from '../../reducers/language.js';

class MapPage extends Component {

  state = store.getState();

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  componentDidMount = () => {
    var self = this;
    this.unsubscribe = store.subscribe(() => {
      let newState = store.getState();

      if (newState.map.error) {
        toastr.error(newState.map.error);
        return store.dispatch(MapActions.noError());
      }

      self.setState(newState);
    });

    // get language from URL
    let code = this.props.params.languageCode;
    const language = _.find(languages, { code });

    // if it is unknown language code
    if (!language) {
      code = defaultLanguage.code;
    }

    this._setLocale(code);
  };

  _setLocale = code => {
    // if language was not changed then do nothing
    if (code === this.state.language.code) {
      return;
    }

    store.dispatch(LanguageActions.changeValue(code));

    // set path and translate
    history.replace(paths.urlBase + code);
  };

  _searchQueryChange = event => {
    let { name, value } = event.target;
    store.dispatch(SearchBarActions.changeValue(name, value));
  };

  _onClickSearch = () => {
    const { searchQuery } = this.state.searchBar;

    store.dispatch(TweetsActions.fetchTweets(searchQuery));
  };

  _onFocusSearchField = () => {
    store.dispatch(SearchBarActions.focus());
  };

  _slidePanelChange = event => {
    let { name, value, checked } = event.target;

    if (name === 'selectedLanguageCode') {
      return this._setLocale(value);
    }

    if (name === 'isMapClickEnabled') {
      value = checked;
    }
    else if (name === 'clickRadius') {
      value = parseInt(value, 10);
    }

    store.dispatch(MapActions.changeValue(name, value));
  };

  _onPopupClose = () => {
    store.dispatch(PopupActions.close());
  };

  _onMapClick = (options = {}) => {

    // hide slide panel if it is visible
    if (this.state.slidePanel.visible) {
      store.dispatch(SlidePanelActions.hide());
    }

    // if click is disabled then do not even trigger the click event
    if (!this.state.map.isMapClickEnabled) {
      return;
    }

    // if we see a popup already then do not trigger the click event
    if (this.state.dataPopup.visible) {
      return;
    }

    // trigger map click
    store.dispatch(MapActions.click({
      point: options.point,
      lpoint: options.lpoint,
      bounds: options.bounds
    }));
  };

  render() {
    return (
      <div className='container-fluid'>
        <div className='snap-drawers'>
          <div className='snap-drawer snap-drawer-left'>
            <SlidePanel
              visible = {this.state.slidePanel.visible}
              clickRadius = {this.state.map.clickRadius}
              isMapClickEnabled = {this.state.map.isMapClickEnabled}
              selectedLanguage = {this.state.language}
              onChange = {this._slidePanelChange} />
          </div>
        </div>

        <div className='site-wrapper snap-content'>
          <div className='site-wrapper-inner'>

            <Map
              isCircleVisible = {this.state.map.isCircleVisible}
              lpoint = {this.state.map.lpoint}
              onClick = {this._onMapClick}
              clickRadius = {this.state.map.clickRadius}
              searchUUID = {this.state.tweets.uuid}
              heatMapData = {this.state.tweets.heatMapData} />

            <SearchBar
              searchQuery = {this.state.searchBar.searchQuery}
              onChange = {this._searchQueryChange}
              onFocus = {this._onFocusSearchField}
              onClickSearch = {this._onClickSearch} />

            <DataPopup
              data = {this.state.tweets.selectedTweets}
              visible = {this.state.dataPopup.visible}
              point = {this.state.dataPopup.point}
              onClose = {this._onPopupClose} />
          </div>
        </div>
      </div>
    );
  }
};

export default MapPage;
