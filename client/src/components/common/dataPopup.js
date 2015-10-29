'use strict';

var React = require('react');

var DataPopup = React.createClass({

  propTypes: {
    id: React.PropTypes.string.isRequired,
    header: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    onClose: React.PropTypes.func.isRequired,
    point: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    rowClass: React.PropTypes.string.isRequired,
    noDataText: React.PropTypes.string
  },

  render: function() {
    var popupStyle = {
      display: this.props.visible ? 'block' : 'none',
      left: this.props.point.x + 'px',
      top: this.props.point.y + 'px'
    };

    var createRow = function(rowData) {
      return (
        <li key={rowData._id}>
          <div className={this.props.rowClass}>
            <span dangerouslySetInnerHTML={{__html: text }}>
            </span>
          </div>
        </li>
      );
    };

    return (
      <div id={this.props.id} className='col-md-2' style={popupStyle}>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <strong>{this.props.header}</strong>
            <button
              type='button'
              className='close btn-xs'
              aria-describedby='descriptionClose'
              onClick={this.props.onClose}>
              <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
            </button>
          </div>
          <div className='panel-body'>
            <ul>
              { this.props.data.length ? this.props.data.map(createRow, this) : <li><div className={this.props.rowClass}><span>{this.props.noDataText}</span></div></li> }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DataPopup;
