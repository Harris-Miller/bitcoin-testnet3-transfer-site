'use strict';

const bookshelf = require('../bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'addresses'
});
