'use strict';

const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const User = require('../../models/user');

router.post('/'), (req, res, next) => {
  const = { email, password } = req.body;

  User
    .query(qb => qb.where({ email }))
    .fetch()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          id: user.id,
          displayName: user.displayName,
          photoUrl: user.photoUrl
        }, 'jwtSecret'); // TODO: use something better for this

        res.json({ token });
      } else {
        return next(createError.Unauthorized('Invalid Credentials'));
      }
    });
});

module.exports = router;
