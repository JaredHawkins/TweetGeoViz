import React, { Component } from 'react';
import { T__ } from '../../reducers/language.js';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h1>{T__('notFoundPage.header')}</h1>
        <p>{T__('notFoundPage.body')}</p>
      </div>
    );
  }
}

export default NotFoundPage;
