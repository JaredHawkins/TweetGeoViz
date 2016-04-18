// webpack specific - including required JS and CSS files
import './navBar.less';

import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import DropDownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down';
import DropUpIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-up';
import IconButton from 'material-ui/lib/icon-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';
import { T__ } from '../../reducers/language.js';
import { MIN_QUERY_LENGTH } from '../../constants/config.js';

class NavBar extends Component {
  render() {
    const {
      searchString = '',
      onChange
    } = this.props;

    const styles = {
      button: {
        marginTop: 6,
      }
    };

    return (
      <div className="row">
        <div className="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 tgv-nav">
          <Paper className="container-fluid">
            <div className="row">
              <div className="col-xs-1 col-md-1 col-lg-1 text-left no-padding-left-right">
                <IconButton
                  tooltip={T__('mapPage.navBar.leftMenuButton.tooltip')}
                  touch={true}
                  onClick={this.props.onClickMenu}
                  tooltipPosition="bottom-right"
                >
                  <MenuIcon/>
                </IconButton>
              </div>
              <div className="hidden-xs hidden-sm col-md-2 col-lg-2 text-right no-padding-left-right">
                <FlatButton
                  labelPosition="before"
                  label={T__('mapPage.navBar.searchButton.label')}
                  icon={<ActionSearch />}
                  style={styles.button}
                  disabled={searchString.length < MIN_QUERY_LENGTH}
                  onClick={this.props.onClickSearch}
                />
              </div>
              <div className="col-xs-1 col-sm-1 hidden-lg hidden-md hidden-lg col-xs-offset-1 text-right no-padding-left-right">
                <IconButton
                  disabled={searchString.length < MIN_QUERY_LENGTH}
                  onClick={this.props.onClickSearch}
                >
                  <ActionSearch />
                </IconButton>
              </div>
              <div className="col-xs-7 col-sm-6 col-md-6 col-lg-6 no-padding-left-right">
                <TextField
                  hintText={T__('mapPage.navBar.searchInput.placeholder')}
                  fullWidth={false}
                  value={searchString}
                  onEnterKeyDown={this.props.onEnterKeyDown}
                  onFocus={this.props.onFocus}
                  onChange={event => {
                    const { value } = event.target;
                    onChange('searchString', value);
                  }}
                />
              </div>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-2 text-right no-padding-left-right">
                <IconButton
                  tooltip={
                    this.props.showAdvanced
                    ? T__('mapPage.navBar.advancedMenuButton.hideToolTip')
                    : T__('mapPage.navBar.advancedMenuButton.showToolTip')
                  }
                  touch={true}
                  tooltipPosition="bottom-left"
                  onClick={this.props.onClickAdvanced}
                >
                  {
                    this.props.showAdvanced
                    ? <DropUpIcon />
                    : <DropDownIcon />
                  }
                </IconButton>
              </div>
            </div>
            {
              this.props.showAdvanced ?
              <div className="row"><Divider /></div>
              : null
            }
            {
              this.props.showAdvanced ?
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                  <p className="padding-top-xs">Start Date:</p>
                </div>
                <div className="col-xs-7 col-sm-7 col-md-8 col-lg-8">
                  <DatePicker
                    hintText={T__('mapPage.navBar.startDate.hintText')}
                    maxDate={this.props.endDate || new Date()}
                    value={this.props.startDate}
                    className="tgv-datePicker"
                    onChange={(event, value) => onChange('startDate', value)}
                  />
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-right no-padding-left-right">
                  <IconButton
                    tooltip={T__('mapPage.navBar.startDate.tooltip')}
                    touch={true}
                    onClick={() => onChange('startDate', undefined)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
              : null
            }
            {
              this.props.showAdvanced ?
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-2 col-lg-2">
                  <p className="padding-top-xs">End Date:</p>
                </div>
                <div className="col-xs-7 col-sm-7 col-md-8 col-lg-8">
                  <DatePicker
                    hintText={T__('mapPage.navBar.endDate.hintText')}
                    minDate={this.props.startDate}
                    value={this.props.endDate}
                    className="tgv-datePicker"
                    maxDate={new Date()}
                    onChange={(event, value) => onChange('endDate', value)}
                  />
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-right no-padding-left-right">
                  <IconButton
                    tooltip={T__('mapPage.navBar.endDate.tooltip')}
                    touch={true}
                    onClick={() => onChange('endDate', undefined)}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
              : null
            }
          </Paper>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onEnterKeyDown: PropTypes.func.isRequired,
  onClickSearch: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  searchString: PropTypes.string,
  showAdvanced: PropTypes.bool
};

export default NavBar;
