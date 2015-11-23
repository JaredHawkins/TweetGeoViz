'use strict';

var React = require('react');

var DataPopupRow = React.createClass({

  propTypes: {
    data: React.PropTypes.object,
    rowClass: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      data: {},
      rowClass: 'tweetText'
    };
  },

  render: function() {
    debugger;
    return (
      <li key={this.props.data._id}>
        <div className={this.props.rowClass}>
          <span dangerouslySetInnerHTML={{__html: this.props.data.text }}></span>
        </div>
      </li>
    );
  }
});

module.exports = DataPopupRow;
