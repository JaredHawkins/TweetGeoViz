// webpack specific - including required JS and CSS files
require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../../node_modules/bootstrap/dist/js/bootstrap.min.js');

import React, { Component } from 'react';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div> {children} </div>
    );
  }
};

export default App;
