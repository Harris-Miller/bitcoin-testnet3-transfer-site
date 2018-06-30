'use strict';

const express = require('express');
const router = new express.Router();

router.get('/test', (req, res) => {
  req.sockets.emit('test', { foo: 'bar' });
  res.json({ message: 'socket.io test complete'});
});

module.exports = router;
