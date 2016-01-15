import React, { Component } from 'react';

export default class App extends Component {
  render() {
    const { props: { children } } = this;
    return (
      <div>
        {children}
      </div>
    );
  }
};
