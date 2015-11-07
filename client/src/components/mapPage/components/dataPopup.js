'use strict';

var React = require('react'),
    DataPopupStore = require('../../../stores/dataPopupStore.js');

var DataPopup = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    onClose: React.PropTypes.func.isRequired,
    noDataText: React.PropTypes.string,
    rowClass: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      visible: DataPopupStore.isVisible(),
      point: DataPopupStore.getPoint()
    }
  },

  getDefaultProps: function() {
    return {
      rowClass: 'tweetText',
      noDataText: 'No Tweets Found'
    };
  },

  componentWillMount: function() {
    DataPopupStore.addChangeListener(this._dataPopupStoreChange);
  },

  componentWillUnmount: function() {
    DataPopupStore.removeChangeListener(this._dataPopupStoreChange);
  },

  _dataPopupStoreChange: function() {
    this.setState({
      visible: DataPopupStore.isVisible(),
      point: DataPopupStore.getPoint()
    });
  },

  render: function() {
    var self = this,
        popupHeader = self.props.data.length + ' Tweets';

    var popupStyle = {
      display: self.state.visible ? 'block' : 'none',
      left: self.state.point.x + 'px',
      top: self.state.point.y + 'px'
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
              onClick={self.props.onClose}>
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
