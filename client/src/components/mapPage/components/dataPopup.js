'use strict';

var React = require('react');
var DataPopupRow = require('./dataPopupRow.js');

var DataPopup = React.createClass({

  propTypes: {
    data: React.PropTypes.array,
    visible: React.PropTypes.bool,
    point: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    noDataText: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      data: [],
      noDataText: 'No Tweets Found',
      visible: false,
      point: {
        left: undefined,
        right: undefined
      }
    };
  },

  _onClose: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.onClose();
  },

  render: function() {
    var self = this,
        popupHeader = self.props.data.length + ' Tweets';

    var popupStyle = {
      display: self.props.visible ? 'block' : 'none',
      left: self.props.point.x + 'px',
      top: self.props.point.y + 'px'
    };

    var noRows = function() {
      return (
        <li>
          <div className={self.props.rowClass}>
            <span>
              {self.props.noDataText}
            </span>
          </div>
        </li>
      );
    };

    return (
      <div id='tweetsPopup' className='col-xs-4' style={popupStyle}>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <strong>{popupHeader}</strong>
            <button
              type='button'
              className='close btn-xs'
              aria-describedby='descriptionClose'
              onClick={self._onClose}>
            <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
            </button>
          </div>
          <div className='panel-body'>
            <ul>
              {
                self.props.data.length ?
                self.props.data.map(function(row) {
                  return (
                    <DataPopupRow
                      key = {row._id}
                      data = {row} />
                  );
                }) :
                noRows()
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DataPopup;
