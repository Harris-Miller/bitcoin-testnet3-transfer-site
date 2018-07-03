'use strict';

const express = require('express');
const createError = require('http-errors');
const router = new express.Router();

router.use('/auth', require('./auth'));
router.use('/callbacks', require('./callbacks'));
router.use('/users', require('./users'));
router.use('/*', (req, res, next) => next(new createError.NotFound()));

module.exports = router;
