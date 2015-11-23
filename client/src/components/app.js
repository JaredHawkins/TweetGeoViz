/* eslint-disable strict */ // Disable check because we can't run strict mode. Need global vars.

$ = jQuery = require('jquery');

var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
