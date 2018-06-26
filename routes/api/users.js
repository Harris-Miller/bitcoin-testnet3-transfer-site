'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const router = new express.Router();
const User = require('../../models/user');

router.route('/').get((req, res) => {
  User
    .query(qb => qb.select('id', 'username', 'email'))
    .fetchAll()
    .then(users => res.json(users));
});

router.route('/').post((req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return next(new createError.BadRequest('Invalid Credentials'));
  }

  const passwordDigest = bcrypt.hashSync(password, 10);

  return User
    .forge({
      username,
      email,
      passwordDigest
    }, {
      hasTimestamps: true
    })
    .save()
    .then(newUser => {
      const { passwordDigest: _, ...rest } = newUser.attributes;
      res.status(201);
      res.json(rest);
    }).catch(err => next(new createError.InternalServerError(err)));
});

// router.route('/:id').get((req, res, next) => {
//   db.user.read({ id: req.params.id })
//     .then(user => {
//       if (!user) {
//         return next(createError.NotFound());
//       }

//       return res.json(user);
//     })
//     .catch(err => next(createError.InternalServerError(err)));
// });

// router.route('/:id').patch((req, res, next) => {
//   db.user.update(req.params.id, req.body)
//     .then(() => {
//       res.status(200);
//       res.end();
//     })
//     .catch(err => next(createError.InternalServerError(err)));
// });

// router.route('/:id').delete((req, res, next) => {
//   db.user.delete(req.params.id)
//     .then(() => {
//       res.status(204);
//       res.end();
//     })
//     .catch(err => next(createError.InternalServerError(err)));
// });

module.exports = router;
