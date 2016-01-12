// webpack specific - including required JS and CSS files
require('../../../../node_modules/toastr/toastr.scss');

import { paths } from '../../config/config.json';
import React, { Component, PropTypes } from 'react';
import toastr from 'toastr';
import Map from './components/map.js';
import SearchBar from './components/searchBar.js';
import SlidePanel from './components/slidePanel.js';
import DataPopup from './components/dataPopup.js';

import MapActions from '../../actions/mapActions.js';
import TweetsActions from '../../actions/tweetsActions.js';
import PopupActions from '../../actions/dataPopupActions.js';
import SearchBarActions from '../../actions/searchBarActions.js';
import SlidePanelActions from '../../actions/slidePanelActions.js';
import LanguageActions from '../../actions/languageActions.js';

import DataPopupStore from '../../stores/dataPopupStore.js';
import SlidePanelStore from '../../stores/slidePanelStore.js';
import MapStore from '../../stores/mapStore.js';
import TweetsStore from '../../stores/tweetsStore.js';
import SearchBarStore from '../../stores/searchBarStore.js';
import LanguageStore, {
  languages,
  defaultLanguage
} from '../../stores/languageStore.js';

import history from '../../history.js';

class MapPage extends Component {

  state = {
    popupData: DataPopupStore.getState(),
    mapData: MapStore.getState(),
    tweetsData: TweetsStore.getState(),
    slidePanelData: SlidePanelStore.getState(),
    searchBarData: SearchBarStore.getState(),
    language: LanguageStore.getState(),
    error: {}
  };

  constructor(props) {
    super(props);

    TweetsStore.addChangeListener(this._tweetsStoreChange);
    DataPopupStore.addChangeListener(this._dataPopupStoreChange);
    MapStore.addChangeListener(this._mapStoreChange);
    SlidePanelStore.addChangeListener(this._slidePanelStoreChange);
    SearchBarStore.addChangeListener(this._searchBarStoreChange);
    LanguageStore.addChangeListener(this._languageStoreChange);
  }

  componentWillUnmount = () => {
    TweetsStore.removeChangeListener(this._tweetsStoreChange);
    DataPopupStore.removeChangeListener(this._dataPopupStoreChange);
    MapStore.removeChangeListener(this._mapStoreChange);
    SlidePanelStore.removeChangeListener(this._slidePanelStoreChange);
    SearchBarStore.removeChangeListener(this._searchBarStoreChange);
    LanguageStore.removeChangeListener(this._languageStoreChange);
  };

  componentDidMount = () => {
    // get language from URL
    let code = this.props.params.languageCode;
    const language = _.find(languages, { code });

    // if it is unknown language code
    if (!language) {
      code = defaultLanguage.code;
      history.replace(paths.urlBase + code);
    }

    this._setLocale(code);
  };

  _setLocale = code => {
    // if language was not changed then do nothing
    if (code === this.state.language.code) {
      return;
    }

    LanguageActions.changeValue(code);

    // set path and translate
    history.replace(paths.urlBase + code);
  };

  _languageStoreChange = () => {
    this.setState({
      language: LanguageStore.getState(),
    });
  };

  _searchBarStoreChange = () => {
    this.setState({
      searchBarData: SearchBarStore.getState()
    });
  };

  _slidePanelStoreChange = () => {
    this.setState({
      slidePanelData: SlidePanelStore.getState()
    });
  };

  _dataPopupStoreChange = () => {
    this.setState({
      popupData: DataPopupStore.getState()
    });
  };

  _mapStoreChange = () => {
    var mapData = MapStore.getState();

    this.setState({
      mapData: mapData
    });

    if (mapData.error) {
      toastr.error(mapData.error);
    }
  };

  _tweetsStoreChange = () => {
    this.setState({
      tweetsData: TweetsStore.getState()
    });
  };

  _searchQueryChange = event => {
    let { name, value } = event.target;
    SearchBarActions.changeValue(name, value);
  };

  _onClickSearch = () => {
    TweetsActions.search(this.state.searchBarData.searchQuery);
  };

  _onFocusSearchField = () => {
    SearchBarActions.focus();
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

    MapActions.changeValue(name, value);
  };

  _onPopupClose = () => {
    PopupActions.close();
  };

  _onMapClick = (options = {}) => {

    // hide slide panel if it is visible
    if (this.state.slidePanelData.visible) {
      SlidePanelActions.hide();
    }

    // if click is disabled then do not even trigger the click event
    if (!this.state.mapData.isMapClickEnabled) {
      return;
    }

    // if we see a popup already then do not trigger the click event
    if (this.state.popupData.visible) {
      return;
    }

    // trigger map click
    MapActions.click({
      point: options.point,
      lpoint: options.lpoint,
      bounds: options.bounds
    });
  };

  render() {
    return (
      <div className='container-fluid'>
        <div className='snap-drawers'>
          <div className='snap-drawer snap-drawer-left'>
            <SlidePanel
              visible = {this.state.slidePanelData.visible}
              clickRadius = {this.state.mapData.clickRadius}
              isMapClickEnabled = {this.state.mapData.isMapClickEnabled}
              selectedLanguage = {this.state.language}
              onChange = {this._slidePanelChange} />
          </div>
        </div>

        <div className='site-wrapper snap-content'>
          <div className='site-wrapper-inner'>

            <Map
              isCircleVisible = {this.state.mapData.isCircleVisible}
              lpoint = {this.state.mapData.lpoint}
              onClick = {this._onMapClick}
              clickRadius = {this.state.mapData.clickRadius}
              searchUUID = {this.state.tweetsData.searchUUID}
              heatMapData = {this.state.tweetsData.heatMapData} />

            <SearchBar
              searchQuery = {this.state.searchBarData.searchQuery}
              onChange = {this._searchQueryChange}
              onFocus = {this._onFocusSearchField}
              onClickSearch = {this._onClickSearch} />

            <DataPopup
              data = {this.state.tweetsData.selectedTweets}
              visible = {this.state.popupData.visible}
              point = {this.state.popupData.point}
              onClose = {this._onPopupClose} />
          </div>
        </div>
      </div>
    );
  }
};

export default MapPage;
