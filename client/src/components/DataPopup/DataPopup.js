// webpack specific - including required JS and CSS files
require('./dataPopup.less');

import React, { Component, PropTypes } from 'react';
import { DataPopupRow, NoDataRow } from '../';
import Paper from 'material-ui/lib/paper';

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
      popupHeader = '',
      onClose
    } = this.props;

    const popupStyle = {
      display: visible ? 'block' : 'none',
      left: `${point.x}px`,
      top: `${point.y}px`
    };

    return (
      <div id="tweetsPopup" className="col-xs-3" style={popupStyle}>
        <Paper className="panel panel-default" zDepth={4}>
          <div className="panel-heading">
            <strong>{popupHeader}</strong>
            <button
              type="button"
              className="close btn-xs"
              aria-describedby="descriptionClose"
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();

                onClose();
              }}
            >
              <span className="glyphicon glyphicon-remove" aria-hidden="true">
              </span>
            </button>
          </div>
          <div className="panel-body">
            <ul>
              {
                data.length ?
                data.map(row =>
                  <DataPopupRow
                    text={row.text}
                    rowClass={rowClass}
                    key={row._id}
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
