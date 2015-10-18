'use strict';

var React = require('react');

var SearchBar = React.createClass({

  render: function() {
    return (
      <div id='searchBar' className='col-md-4'>
        <form id='searchBarForm' action='search' method='post'>
          <div className='input-group'>
            <span className='input-group-btn'>
              <button aria-label='Search' className='btn btn-default'>
                <span aria-hidden='true' className='glyphicon glyphicon-search'></span>
                Search
              </button>
            </span>
            <input name='tweetText' placeholder='keyword1 , keyword2, keyword3, ...' aria-describedby='basic-addon' className='form-control' type='text' />
            <span className='input-group-addon' id='basic-addon'>tweet keywords</span>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = SearchBar;
