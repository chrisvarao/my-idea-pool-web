import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getCurrentUserFromCookies } from './api';
import App from './components/app';
import { getState, store } from './state';

import './style.css';

const container = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

render(
  container,
  document.getElementById('root'),
);

getCurrentUserFromCookies().then(() => {
  const user = getState('user');
  if (!user && !['/signin', '/signup'].includes(window.location.pathname)) {
    window.location.pathname = '/signin';
  }
});
