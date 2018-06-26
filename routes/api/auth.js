'use strict';

const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const User = require('../../models/user');
const config = require('../../config');

router.route('/').post((req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);

  User
    .query(qb => qb.where({ email }))
    .fetch()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.get('passwordDigest'))) {
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username'),
        }, config.jwtSecret);

        res.json({ token });
      } else {
        return next(createError.Unauthorized('Invalid Credentials'));
      }
    });
});

module.exports = router;
