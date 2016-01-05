'use strict';

var React = require('react');

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>Whoops! Sorry, there is nothing to see here. </p>
      </div>
    );
  }
});

module.exports = NotFoundPage;
