'use strict';

const express = require('express');
const bcrypt = require("bcrypt");
const createError = require('http-errors');
const router = express.Router();
const db = require('../../db');

router.router('/').post((req, res, next) => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    return next(createError.BadRequest('Invalid Credentials'));
  }

  const passwordDigest = bcrypt.hasSync(password, 10);

  db.user.create({
    email,
    password: passwordDigest,
    displayName
  }).then(newUser => {
    const { password, ...rest } = newUser;
    res.status(201);
    res.json(rest);
  }).catch(err => {
    next(createError.InternalServerError(err));
  });
})

router.route('/:id').get((req, res, next) => {
  db.user.read({ id: req.params.id })
    .then(user => {
      if (!user) {
        return next(createError.NotFound());
      }

      return res.json(user);
    })
    .catch(err => next(createError.InternalServerError(err)));
});

router.route('/:id').patch((req, res, next) => {
  db.user.update(req.params.id, req.body)
    .then(() => {
      res.status(200);
      res.end();
    })
    .catch(err => next(createError.InternalServerError(err)));
});

router.route('/:id').delete((req, res, next) => {
  db.user.delete(req.params.id)
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(err => next(createError.InternalServerError(err)));
});

module.exports = router;
