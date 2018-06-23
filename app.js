'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const GitHubStrategy = require('passport-github2');

// const db = require('./db');

const app = express();

// db.connect();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return done (null, profile);
  }
));

passport.serializeUser(function(user, next) {
  next(null, user);
});

passport.deserializeUser(function(obj, next) {
  next(null, obj);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
  }),
  secret: 'keyboard cat',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'));
app.use('/static', express.static(path.join(__dirname, 'bitcoin-testnet3-front-end/build/static')));
app.use(express.static(path.join(__dirname, 'bitcoin-testnet3-front-end/build')));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { status: err.status, message: err.message } });
});

module.exports = app;
