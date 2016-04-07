// webpack specific - including required JS and CSS files
require('./dataPopup.less');

import React, { Component, PropTypes } from 'react';
import { DataPopupRow, NoDataRow } from '../';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';

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
      display: visible ? 'block' : 'none',
      left: `${point.x}px`,
      top: `${point.y}px`
    };

    return (
      <div id="tweetsPopup" className="col-xs-10 col-sm-6 col-md-4 col-lg-4" style={popupStyle}>
        <Paper className="panel panel-default" zDepth={4}>
          <div className="panel-heading">
            <strong>{popupHeader}</strong>
            <IconButton
              tooltip="Close Popup"
              touch={true}
              className="close tgv-closePopup"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {
            showFilter && (filterText.length || data.length) ?
            <Paper className="panel-body filter-panel">
              <TextField
                hintText="Filter Tweets..."
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
                data.map(row =>
                  <DataPopupRow
                    showTimeStamps={showTimeStamps}
                    timeStamp={row.timeStamp}
                    text={row.text}
                    rowClass={rowClass}
                    key={row._id || row.timeStamp}
                  />
                )
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
  noDataText: PropTypes.string
};

export default DataPopup;
