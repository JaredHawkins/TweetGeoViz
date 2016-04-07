// webpack specific - including required JS and CSS files
require('./slidePanel.less');

import React, { Component, PropTypes } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field';
import { T__ } from '../../reducers/language.js';
import { DropDown } from '../';

class SlidePanel extends Component {
  render() {
    const {
      isMapClickEnabled = true,
      clickRadius = 250,
      selectedLanguage,
      languages,
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

    const sizeStyle = {
      maxWidth: '226px'
    };

    const textStyle = {
      color: '#eee'
    };

    const floatingLabelStyle = {
      ...textStyle,
      opacity: 0.5
    };

    return (
      <LeftNav open={this.props.visible} className="tgv-slidePanel">
        <h3>{this.props.header}</h3>
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
            <SelectField
              value={selectedLanguage.code}
              floatingLabelText={T__('mapPage.slidePanel.languageSelector.label')}
              style={sizeStyle}
              floatingLabelStyle={floatingLabelStyle}
              labelStyle={textStyle}
              onChange={(event, index, value) =>
                onChange('selectedLanguageCode', value)
              }
            >
              {
                languages.map(language => <MenuItem
                  value={language.code}
                  key={language.code}
                  primaryText={language.name}
                />)
              }
            </SelectField>
          </li>
          <li>
            <Checkbox
              label={T__('mapPage.slidePanel.mapClick.label')}
              labelPosition="left"
              className="tgv-slidePanel-control-width"
              labelStyle={textStyle}
              checked={isMapClickEnabled}
              onCheck={(event, value) => onChange('isMapClickEnabled', value)}
            />
          </li>
          <li>
            <Checkbox
              label={T__('mapPage.slidePanel.showFilter.label')}
              labelPosition="left"
              className="tgv-slidePanel-control-width"
              labelStyle={textStyle}
              checked={this.props.showFilter}
              onCheck={(event, value) => onChange('showFilter', value)}
            />
          </li>
          <li>
            <Checkbox
              label={T__('mapPage.slidePanel.showTimeStamps.label')}
              labelPosition="left"
              className="tgv-slidePanel-control-width"
              labelStyle={textStyle}
              checked={this.props.showTimeStamps}
              onCheck={(event, value) => onChange('showTimeStamps', value)}
            />
          </li>
          <li>
            <TextField
              hintText={1}
              floatingLabelText={T__('mapPage.slidePanel.clickRadius.label')}
              value={clickRadius}
              className="tgv-slidePanel-control-width"
              inputStyle={textStyle}
              floatingLabelStyle={floatingLabelStyle}
              onChange={event => {
                let { value } = event.target;
                value = value.replace(/\D/g, '');

                value = value.length ? parseInt(value, 10) : 1;

                if (value === clickRadius) {
                  return;
                }

                onChange('clickRadius', value);
              }}
            />
          </li>
        </ul>
        <div>
          <p>{T__('mapPage.slidePanel.footer1')}</p>
          <p>{T__('mapPage.slidePanel.footer2')}</p>
          <p>
            <span className="label label-primary">v{this.props.version}</span>
          </p>
        </div>
      </LeftNav>
    );
  }
}

SlidePanel.propTypes = {
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

export default SlidePanel;
