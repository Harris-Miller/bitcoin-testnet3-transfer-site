'use strict';

const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const db = require('../../db');

router.post('/'), (req, res, next) => {
  const = { email, password } = req.body;

  db.user.query.findOne({ where: { email }})
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          id: user.id,
          displayName: user.displayName,
          photoUrl: user.photoUrl
        }, 'jwtSecret'); // TODO: use something better for this
      } else {
        return next(createError.Unauthorized('Invalid Credentials'));
      }
    })
});

router.get(() => {
});

module.exports = router;
