'use strict';

// this abstraction allows us to swap databases
// let's say there is a mongo or mysql implementation (assuming they all adhere to the same interface)
// then we can simple change the export here to one of those and restart the application
const postgresdb = require('./postgres');
module.exports = postgresdb;
