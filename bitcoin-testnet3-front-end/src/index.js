/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import registerServiceWorker from './register-service-worker';
import io from './socket-io';

io.on('test', data => {
  console.log(data);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
