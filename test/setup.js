const chai = require('chai');
const dirtyChai = require('dirty-chai');
const sinon = require('sinon');

chai.use(dirtyChai);

global.expect = chai.expect;
global.sinon = sinon;
