const knex = require('knex');
const bookshelf = require('bookshelf');
const knexConfig = require('./knexfile');

const instance = bookshelf(knex(knexConfig.development));
instance.plugin('case-converter');

module.exports = instance;
