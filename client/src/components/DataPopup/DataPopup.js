// webpack specific - including required JS and CSS files
import './dataPopup.less';

import React, { Component, PropTypes } from 'react';
import { DataPopupRow, NoDataRow } from '../';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';
import { T__ } from '../../reducers/language.js';

class DataPopup extends Component {
  render() {
    const {
      data = [],
      noDataText,
      rowClass = 'tweetText',
      visible = false,
      point = {
        x: undefined,
        y: undefined
      },
      filterText,
      showFilter,
      showTimeStamps,
      popupHeader = '',
      onClose,
      onChange
    } = this.props;

    const popupStyle = {
      display: visible ? 'block' : 'none'
    };

    return (
      <div id="tweetsPopup" style={popupStyle}>
        <Paper className="panel panel-default" zDepth={4}>
          <div className="panel-heading">
            <strong>{popupHeader}</strong>
            <IconButton
              tooltip={T__('mapPage.dataPopup.closeButton.tooltip')}
              touch={true}
              className="close tgv-closePopup"
              onTouchEnd={event => onClose()}
              onMouseUp={event => onClose()}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {
            showFilter && (filterText.length || data.length) ?
            <Paper className="panel-body filter-panel">
              <TextField
                hintText={T__('mapPage.dataPopup.filter.hintText')}
                fullWidth={true}
                value={filterText}
                onChange={event => {
                  const { value } = event.target;
                  onChange('filterText', value.trim());
                }}
              />
            </Paper>
            : null
          }
          <div className="panel-body tweet-panel">
            <ul>
              {
                data.length ?
                data.map(feature => <DataPopupRow
                  showTimeStamps={showTimeStamps}
                  timeStamp={feature.timeStamp}
                  text={feature.textHTML}
                  rowClass={rowClass}
                  key={feature.id}
                />)
                : <NoDataRow noDataText={noDataText} rowClass={rowClass} />
              }
            </ul>
          </div>
        </Paper>
      </div>
    );
  }
}

DataPopup.propTypes = {
  data: PropTypes.array,
  visible: PropTypes.bool,
  point: PropTypes.object,
  popupHeader: PropTypes.string,
  rowClass: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  noDataText: PropTypes.string,
  filterText: PropTypes.string,
  showFilter: PropTypes.bool,
  showTimeStamps: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default DataPopup;
