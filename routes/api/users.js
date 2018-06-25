'use strict';

const express = require('express');
const passport = require('passport');
const createError = require('http-errors');
const router = express.Router();
const db = require('../../db');

router.route('/').get(passport.authorize('github'), (req, res, next) => {
  db.user.read()
    .then(users => res.json(users))
    .catch(err => next(createError.InternalServerError(err)));
});

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
