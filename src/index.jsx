import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import { store } from './state';

import './style.css';

const container = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  container,
  document.getElementById('root'),
);
