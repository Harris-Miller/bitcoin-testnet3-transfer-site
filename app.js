'use strict';

require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('socket.io');

const app = express();

// don't need to see logger in tests
process.env.NODE_ENV !== 'test' && app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.APP_URL);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTION');
  next();
});

app.set('json spaces', 2);

app.io = io();
app.use((req, res, next) => {
  req.sockets = app.io.sockets;
  next();
});

app.use('/api', require('./routes/api'));
app.use('/static', express.static(path.join(__dirname, 'bitcoin-testnet3-front-end/build/static')));
app.use('/*', express.static(path.join(__dirname, 'bitcoin-testnet3-front-end/build')));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (req.app.get('env') === 'development') {
    console.log(err); // eslint-disable-line no-console
  }

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { status: err.status, message: err.message } });
});

module.exports = app;
