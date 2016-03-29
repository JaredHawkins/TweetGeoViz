import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './containers';
import { NotFoundPage } from './components';

export default (
  <Route path="/(:languageCode)" component={App}>
    <IndexRoute component={App} />
    <Route path="*" component={NotFoundPage} status={404} />
  </Route>
);
