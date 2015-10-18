/* eslint-disable strict */ // Disable check because we can't run strict mode. Need global vars.

$ = jQuery = require('jquery');

var React = require('react'),
    RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({

  render: function() {
    return (
      <RouteHandler />
    );
  }
});

module.exports = App;
