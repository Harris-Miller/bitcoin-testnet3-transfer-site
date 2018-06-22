/* eslint-disable react/jsx-filename-extension */

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './store';
import './index.css';
import App from './app';
import registerServiceWorker from './register-service-worker';

const Root = () => (
  <Provider store={store}>
    <Fragment>
      <CssBaseline />
      <App />
    </Fragment>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
