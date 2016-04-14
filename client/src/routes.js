import React from 'react';
import { Route } from 'react-router';
import { App, Layout } from './containers';
import { NotFoundPage } from './components';

export default (
  <Route path="/" component={Layout}>
    <Route path="/(:languageCode)" component={App} />
    <Route path="/:languageCode/search" component={App} />
    <Route path="*" component={NotFoundPage} status={404} />
  </Route>
);
