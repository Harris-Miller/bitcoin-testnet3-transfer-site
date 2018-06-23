'use strict';

const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.get('/', passport.authenticate('github', { scope: [ 'user' ] }));

router.get('/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  console.log(req.query);
  res.redirect('/');
})

module.exports = router;
