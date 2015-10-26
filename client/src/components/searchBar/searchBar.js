'use strict';

var React = require('react'),
    SlidePanelStore = require('../../stores/slidePanelStore.js'),
    TweetsActions = require('../../actions/tweetsActions.js'),
    SearchBarActions = require('../../actions/searchBarActions.js');

var SearchBar = React.createClass({

  _onSearchInputClick: function() {
    SearchBarActions.onFocus();
  },

  _onSearchClick: function() {
    debugger;
    TweetsActions.search('aa');
  },

  render: function() {
    return (
      <div id='searchBar' className='col-md-4'>

          <div className='input-group'>
            <span className='input-group-btn'>
              <button aria-label='Search' className='btn btn-default' onClick={this._onSearchClick}>
                <span aria-hidden='true' className='glyphicon glyphicon-search'></span>
                Search
              </button>
            </span>
            <input name='tweetText' placeholder='keyword1 , keyword2, keyword3, ...' aria-describedby='basic-addon' className='form-control' type='text' onClick={this._onSearchInputClick} />
            <span className='input-group-addon' id='basic-addon'>tweet keywords</span>
          </div>

      </div>
    );
  }
});

module.exports = SearchBar;
