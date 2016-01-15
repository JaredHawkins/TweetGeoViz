import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes.js';

import store from './stores/appStore.js';

// <--- dispatch init actions HERE

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);
