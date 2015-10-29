'use strict';

var React = require('react'),
    TweetsPopupActions = require('../../actions/tweetsPopupActions.js');

var TweetsPopup = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    searchQuery: React.PropTypes.string.isRequired,
    point: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired
  },

  _onClick: function(event) {
    TweetsPopupActions.closePopup();
  },

  render: function() {
    var popupStyle = {
      display: this.props.visible ? 'block' : 'none',
      left: this.props.point.x + 'px',
      top: this.props.point.y + 'px'
    };

    var createRow = function(rowData) {
      var regex = new RegExp(this.props.searchQuery, 'ig');
      var text = rowData.text.replace(regex, '<span class="selection">$&</span>');

      return (
        <li key={rowData._id}>
          <div className='tweetText'>
            <span dangerouslySetInnerHTML={{__html: text }}>
            </span>
          </div>
        </li>
      );
    };

    return (
      <div id='tweetsPopup' className='col-md-2' style={popupStyle}>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <strong>{this.props.data.length} Tweets</strong>
            <button id='tweetsPopup-close' aria-hidden='true' type='button' className='close' onClick={this._onClick}>×</button>
          </div>
          <div className='panel-body'>
            <ul>
              { this.props.data.length? this.props.data.map(createRow, this) : <li><div className='tweetText'><span>No Tweets Found</span></div></li> }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TweetsPopup;
