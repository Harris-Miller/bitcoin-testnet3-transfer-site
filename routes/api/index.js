const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.json({ foo: 'bar' });
});

module.exports = router;
