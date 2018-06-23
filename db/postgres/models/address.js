'use strict';

const Sequelize = require('sequelize');

function address(sequelize) {
  return sequelize.define('address', {
    address: Sequelize.STRING
  });
}

module.exports = address;
