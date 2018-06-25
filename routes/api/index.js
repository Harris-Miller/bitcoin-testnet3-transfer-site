'use strict';

const express = require('express');
const router = new express.Router();

// router.use('/auth', require('./auth'));
router.use('/callbacks', require('./callbacks'));
// router.use('/users', require('./users'));

router.get('/', (req, res) => {
  res.json({ foo: 'bar' });
});

module.exports = router;
