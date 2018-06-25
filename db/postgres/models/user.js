'use strict';

const Sequelize = require('sequelize');

function user(sequelize) {
  return sequelize.define('user', {
    id: { type: Sequelize.STRING, primaryKey: true },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    displayName: Sequelize.STRING,
    photoUrl: Sequelize.STRING
  });
}

module.exports = user;
