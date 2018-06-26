const camelcase = require('lodash.camelcase');
const snakecase = require('lodash.snakecase');
const bookshelf = require('../bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'users'
});
