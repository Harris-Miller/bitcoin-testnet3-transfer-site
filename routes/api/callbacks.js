'use strict';

const express = require('express');
const router = new express.Router();

router.post('/transaction/:address', (req, res) => {
  const { address } = req.params;

  req.sockets.emit('transaction', { address, txs: req.body });
  res.status(204);
  res.end();
});

module.exports = router;
