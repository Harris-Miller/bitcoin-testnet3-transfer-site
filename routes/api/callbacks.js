'use strict';

const express = require('express');
const router = new express.Router();

router.post('/unconfirmed-tx', (req, res) => {
  res.json({ foo: 'bar' });
});

router.post('/confirmed-tx');

router.post('/tx-confirmation');

module.exports = router;
