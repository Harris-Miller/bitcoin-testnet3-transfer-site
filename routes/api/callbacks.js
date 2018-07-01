'use strict';

const express = require('express');
const router = new express.Router();

router.get('/test', (req, res) => {
  req.sockets.emit('test', { foo: 'bar' });
  res.json({ message: 'socket.io test complete'});
});

router.post('/transaction/:address', (req, res) => {
  const { address } = req.params;

  req.sockets.emit('transaction', { address, txs: req.body });
  res.status(204);
  res.end();
});

module.exports = router;
