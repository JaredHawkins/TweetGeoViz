'use strict';

var React = require('react'),
    DataPopup = require('../../common/dataPopup.js'),
    TweetsPopupStore = require('../../../stores/tweetsPopupStore.js'),
    TweetsStore = require('../../../stores/tweetsStore.js'),
    TweetsPopupActions = require('../../../actions/tweetsPopupActions.js');

var TweetsPopup = React.createClass({

  getInitialState: function() {
    return {
      selectedTweets: [],
      visible: false,
      point: {
        x: -100,
        y: -100
      }
    };
  },

  componentWillMount: function() {

    // set default state from store
    this.setState({
      selectedTweets: [],
      visible: TweetsPopupStore.isVisible(),
      point: TweetsPopupStore.getPoint()
    });

    TweetsPopupStore.addChangeListener(this._stateChange);
  },

  componentWillUnmount: function() {
    TweetsPopupStore.removeChangeListener(this._stateChange);
  },

  _stateChange: function() {
    var selectedTweets = [];

    var visible = TweetsPopupStore.isVisible();

    if (visible) {
      selectedTweets = TweetsStore.getSelectedTweets();
    }

    this.setState({
      selectedTweets: selectedTweets,
      visible: visible,
      point: TweetsPopupStore.getPoint()
    });
  },

  _onClose: function() {
    TweetsPopupActions.closePopup();
  },

  render: function() {
    var headerText = this.state.selectedTweets.length + ' Tweets';

    return (
      <DataPopup
        id='tweetsPopup'
        header={headerText}
        data={this.state.selectedTweets}
        onClose={this._onClose}
        point={this.state.point}
        visible={this.state.visible}
        rowClass='tweetText'
        noDataText='No Tweets Found' />
    );
  }
});

module.exports = TweetsPopup;
