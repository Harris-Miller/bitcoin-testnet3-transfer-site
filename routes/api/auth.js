'use strict';

const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.get('/', passport.authenticate('github', { scope: ['user', 'user:email'] }));

router.get('/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect(req.app.get('env') === 'development' ? 'http://localhost:3001' : '/');
});

module.exports = router;
