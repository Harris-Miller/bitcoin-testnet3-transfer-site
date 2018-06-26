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
    try {
      const decoded = jwt.verify(token, config.jwtSecret);

      User.query({
        where: { id: decoded.id}
        select: ['id', 'username', 'email']
      }).fetch().then(user => {
        if (!user) {
          return next(new createError.Unauthorized());
        }

        req.user = user;
        return next();
      });
    } catch(err) {
      next(new createError.Unauthorized());
    }
  } else {
    next(new createError.Unauthorized());
  }
};

module.exports = authenticate;
