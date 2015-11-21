'use strict';

var React = require('react');

var DataPopup = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    visible: React.PropTypes.bool,
    point: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    noDataText: React.PropTypes.string,
    rowClass: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      rowClass: 'tweetText',
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

    var createRow = function(rowData) {
      return (
        <li key={rowData._id}>
          <div className={self.props.rowClass}>
            <span dangerouslySetInnerHTML={{__html: rowData.text }}>
            </span>
          </div>
        </li>
      );
    };

    return (
      <div id='tweetsPopup' className='col-md-2' style={popupStyle}>
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
                self.props.data.map(createRow) :
                <li>
                  <div className={self.props.rowClass}>
                    <span>
                      {self.props.noDataText}
                    </span>
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DataPopup;
