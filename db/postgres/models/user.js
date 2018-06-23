'use strict';

const Sequelize = require('sequelize');

function user(sequelize) {
  return sequelize.define('user', {
    email: Sequelize.STRING,
    
  });
}