// webpack specific - including required JS and CSS files
require('./slidePanel.less');
require('../../../../node_modules/snapjs/snap.css');

import React, { Component, PropTypes } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import Snap from 'snapjs';
import { T__ } from '../../reducers/language.js';

import { DropDown } from '../';

class SlidePanel extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    selectedLanguage: PropTypes.object.isRequired,
    clickRadius: PropTypes.number,
    isMapClickEnabled: PropTypes.bool,
    contentSelector: PropTypes.string,
    languages: PropTypes.array,
    version: PropTypes.string,
    header: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    visible: false,
    isMapClickEnabled: true,
    clickRadius: 250000
  };

  componentDidMount = () => {
    const {
      contentSelector,
      visible
    } = this.props;

    this._snapPanel = new Snap({
      element: document.querySelector(contentSelector),
      tapToClose: false,
      touchToDrag: false,
      hyperextensible: false
    });

    this._togglePanel(visible);
  };

  componentDidUpdate = (prevProps) => {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      this._togglePanel(visible);
    }
  };

  _closePanel = () => {
    this._snapPanel.close();
  };

  _openPanel = () => {
    this._snapPanel.open('left');
  };

  _togglePanel = (visible) => {
    this[visible ? '_openPanel' : '_closePanel']();
  };

  render() {
    const {
      isMapClickEnabled = true,
      clickRadius = 250,
      selectedLanguage,
      languages,
      version,
      header,
      onChange
    } = this.props;

    const twitterFollowStyle = {
      position: 'static',
      visibility: 'visible',
      width: '115px',
      height: '20px'
    };

    const twitterTweetStyle = {
      position: 'static',
      visibility: 'visible',
      width: '55px',
      height: '20px'
    };

    return (
      <LeftNav open={this.props.visible}>
        <h3>{header}</h3>
        <div className="slidePanel-social">
          <iframe
            data-url="https://github.com/JaredHawkins/TweetGeoViz"
            src="http://platform.twitter.com/widgets/tweet_button.a428ab2e859e8008e0df5404770eb017.en.html#_=1445128480488&amp;count=none&amp;dnt=false&amp;id=twitter-widget-1&amp;lang=en&amp;original_referer=http%3A%2F%2Flocalhost%3A2063%2Fsearch&amp;size=m&amp;text=TweetGeoViz%20-%20Visualization%20tool%20to%20view%20tweets%20by%20location%20and%20content.&amp;type=share&amp;url=https%3A%2F%2Fgithub.com%2FJaredHawkins%2FTweetGeoViz&amp;via=twitanvk"
            title="Twitter Tweet Button"
            style={twitterTweetStyle}
            className="twitter-share-button twitter-share-button-rendered twitter-tweet-button"
            allowTransparency="true"
            scrolling="no"
            id="twitter-widget-1"
            frameBorder="0"
          >
          </iframe>
          <iframe
            data-screen-name="twitanvk"
            src="http://platform.twitter.com/widgets/follow_button.450bd5fbaeab74caf9d49a3141d20693.en.html#_=1445128480471&amp;dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=twitanvk&amp;show_count=false&amp;show_screen_name=true&amp;size=m"
            title="Twitter Follow Button"
            style={twitterFollowStyle}
            className="twitter-follow-button twitter-follow-button-rendered"
            allowTransparency="true"
            scrolling="no"
            id="twitter-widget-0"
            frameBorder="0"
          >
          </iframe>
          <iframe
            src="http://ghbtns.com/github-btn.html?user=JaredHawkins&amp;repo=TweetGeoViz&amp;type=fork&amp;count=true"
            allowTransparency="true"
            scrolling="0"
            frameBorder="0"
            height="20"
            width="120"
          >
          </iframe>
          <iframe
            src="http://ghbtns.com/github-btn.html?user=JaredHawkins&amp;repo=TweetGeoViz&amp;type=follow&amp;count=true"
            allowTransparency="true"
            scrolling="0"
            frameBorder="0"
            height="20"
            width="120"
          >
          </iframe>
        </div>
        <h4>{T__('mapPage.slidePanel.header')}</h4>
        <ul>
          <li>
            <div className="input-group input-group-sm">
              <span className="input-group-addon">
                {T__('mapPage.slidePanel.languageSelector.label')}
              </span>
              <DropDown
                name = "selectedLanguageCode"
                data = {languages}
                dataKey = "id"
                dataValue = "code"
                dataName = "name"
                selectedValue = {selectedLanguage.code}
                onChange = {onChange}
              />
            </div>
            <div className="input-group input-group-sm">
              <span id="cursor-click-radius-description" className="input-group-addon">
                {T__('mapPage.slidePanel.clickRadius.label')}
              </span>
              <input
                name="clickRadius"
                placeholder="0"
                aria-describedby="cursor-click-radius-description"
                className="form-control"
                type="number"
                value={clickRadius}
                onChange={onChange}
              />
              <span className="input-group-addon">km</span>
            </div>
            <div className="input-group input-group-sm">
              <span className="input-group-addon">
                {T__('mapPage.slidePanel.mapClick.label')}
              </span>
              <span className="input-group-addon">
                <input
                  name="isMapClickEnabled"
                  aria-label={T__('mapPage.slidePanel.mapClick.label')}
                  type="checkbox"
                  checked={isMapClickEnabled}
                  onChange={onChange}
                />
              </span>
            </div>
          </li>
        </ul>
        <div>
          <p>{T__('mapPage.slidePanel.footer1')}</p>
          <p>{T__('mapPage.slidePanel.footer2')}</p>
          <p>
            <span className="label label-primary">v{version}</span>
          </p>
        </div>
      </LeftNav>
    );
  }
}

export default SlidePanel;
