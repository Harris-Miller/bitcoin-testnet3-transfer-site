'use strict';

const bookshelf = require('../bookshelf');
const Address = require('./address');

module.exports = bookshelf.Model.extend({
  tableName: 'users',
  addresses() {
    return this.hasMany(Address)
  }
});
