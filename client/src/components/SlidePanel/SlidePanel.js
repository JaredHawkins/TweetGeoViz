// webpack specific - including required JS and CSS files
import './slidePanel.less';

import React, { Component, PropTypes } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Checkbox from 'material-ui/lib/checkbox';
import TextField from 'material-ui/lib/text-field';
import { T__ } from '../../reducers/language.js';
import { DropDown, SlidePanelSocial } from '../';

class SlidePanel extends Component {
  render() {
    const {
      isMapClickEnabled = true,
      clickRadius = 250,
      selectedLanguage,
      languages,
      onChange
    } = this.props;

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
        <SlidePanelSocial />
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
          <li>
            <SelectField
              value={this.props.selectedLayer}
              floatingLabelText={T__('mapPage.slidePanel.layerSelector.label')}
              style={sizeStyle}
              floatingLabelStyle={floatingLabelStyle}
              labelStyle={textStyle}
              onChange={(event, index, value) =>
                onChange('selectedLayer', value)
              }
            >
              {
                this.props.layers.map(layer => <MenuItem
                  value={layer.value}
                  key={layer.value}
                  primaryText={layer.label}
                />)
              }
            </SelectField>
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
