'use strict';

var React = require('react');

var TweetsPopup = React.createClass({

  render: function() {
    return (
      <div id='tweetsPopup' className='col-md-2'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <strong>0 Tweets</strong>
            <button id='tweetsPopup-close' aria-hidden='true' type='button' className='close'>×</button>
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
