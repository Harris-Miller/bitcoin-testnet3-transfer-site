'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const axios = require('axios');
const router = new express.Router();
const User = require('../../models/user');
const Address = require('../../models/address');
const authenticate = require('../../middleware/authenticate');
const addrToResObj = require('../../utils/addrToResObj');

const BLOCKCYPHER_TOKEN = process.env.BLOCKCYPHER_TOKEN;

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

router.route('/:id/addresses').get((req, res, next) => {
  // if (req.userId !== req.params.id) {
  //   return next(new createError.Unauthorized());
  // }

  Address
    .query({
      where: { user_id: req.params.id }
    })
    .fetchAll()
    .then(results => Promise.all(results.map(r => axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${r.get('key')}/full`).then(({ data }) => data))))
    .then(results => {
      // instead of just having an array of addresses, and those having an array of transactions
      // let's convert those arrays into key'd objects, where the address/hash
      // act as the keys, this will be much easier to deal with on the client side
      res.json(addrToResObj(results));
    });
});

router.route('/:id/addresses').post((req, res, next) => {
  // if (req.userId !== req.params.id) {
  //   return next(new createError.Unauthorized());
  // }

  const { id: userId } = req.params;
  const { key } = req.body;

  Address
    .query(qb => qb.where({ key }))
    .fetch()
    .then(address => {
      if (address) {
        // address already added, fetch expanded data, process and return
        axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address.get('key')}/full`)
          .then(({ data }) => data)
          .then(result => res.status(201).json(addrToResObj([result])));
      } else {
        // first, add event to blockcypher
        axios.post(`https://api.blockcypher.com/v1/btc/test3/hooks?token=${BLOCKCYPHER_TOKEN}`, {
          event: 'tx-confirmation',
          address: key,
          url: `http://317f1ae6.ngrok.io/api/callbacks/transaction/${key}`
        })
        .then(({ data }) => 
          // add it to db, then fetch expanded data, process and return
          Address
            .forge({
              key,
              userId,
              eventId: data.id
            }, {
              hasTimestamps: true
            })
            .save()
        )
        .then(newAddress => axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${newAddress.get('key')}/full`))
        .then(({ data }) => data)
        .then(result => res.status(201).json(addrToResObj([result])));
      }
    });
});

router.route('/:id/addresses/:address').delete((req, res, next) => {
  // if (req.userId !== req.params.id) {
  //   return next(new createError.Unauthorized());
  // }

  const { address: key } = req.params;

  Address
    .query(qb => qb.where({ key }))
    .fetch()
    .then(address => {
      if (!address) {
        return next(new createError.BadRequest('Address does not exist for User'));
      }

      return axios.delete(`https://api.blockcypher.com/v1/btc/test3/hooks/${address.get('event_id')}?token=${BLOCKCYPHER_TOKEN}`)
        .then(() => address)
        .then(address => address.destroy())
        .then(() => res.status(204).end());
    });
})

module.exports = router;
