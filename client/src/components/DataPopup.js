// webpack specific - including required JS and CSS files
require('../less/mapPage/tweetsPopup.less');

import React, { Component, PropTypes } from 'react';
import DataPopupRow from './DataPopupRow.js';
import NoDataRow from './NoDataRow.js';

class DataPopup extends Component {
  render() {
    const {
      data = [],
      noDataText,
      rowClass = '',
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
      left: point.x + 'px',
      top: point.y + 'px'
    };

    return (
      <div id='tweetsPopup' className='col-xs-3' style={popupStyle}>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <strong>{popupHeader}</strong>
            <button
              type='button'
              className='close btn-xs'
              aria-describedby='descriptionClose'
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();

                onClose();
              }}
            >
              <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
            </button>
          </div>
          <div className='panel-body'>
            <ul>
              {
                data.length ?
                data.map(row =>
                  <DataPopupRow
                    text = {row.text}
                    rowClass = {rowClass}
                    key = {row._id} />
                )
                :
                <NoDataRow
                  noDataText = {noDataText}
                  rowClass = {rowClass} />
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

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
