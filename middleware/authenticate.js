const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const config = require('../config');

const authenticate = (req, res, next) => {
  const authorizationHeader = req.header['authorization'];

  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return next(new createError.Unauthorized())
      }

      req.userId = decoded.id;
      return next();
    });
  } else {
    next(new createError.Forbidden());
  }
};

module.exports = authenticate;
