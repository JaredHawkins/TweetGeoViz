'use strict';

var React = require('react'),
    TweetsPopupActions = require('../../actions/tweetsPopupActions.js');

var TweetsPopup = React.createClass({

  propTypes: {
    point: React.PropTypes.object,
    visible: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      point: {
        x: -100,
        y: -100
      },
      visible: false
    };
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

    return (
      <div id='tweetsPopup' className='col-md-2' style={popupStyle}>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <strong>0 Tweets</strong>
            <button id='tweetsPopup-close' aria-hidden='true' type='button' className='close' onClick={this._onClick}>×</button>
          </div>
          <div className='panel-body'>
            <ul>
              <li>
                <div className='tweetText'>
                  <span>No Tweets Found</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TweetsPopup;
