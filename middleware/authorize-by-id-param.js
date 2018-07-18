const createError = require('http-errors');

const authorizeByIdParam = (req, res, next) => {
  const { userId } = req;

  if (!userId) {
    return next(new Error('authenticate middleware must be user before authorizeByIdParam'));
  }

  const { id } = req.params;

  if (!id) {
    return next(new Error('authorizeByIdParam middleware is only allowed to be used on route with id param'));
  }

  if (userId !== parseInt(id, 10)) {
    return next(new createError.Unauthorized());
  }

  next();
};

module.exports = authorizeByIdParam;
