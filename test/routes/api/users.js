'use strict';

const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const User = require('../../../models/user');
const Address = require('../../../models/address');
const config = require('../../../config');
const authenticationTests = require('../../middleware/authenticate');

describe('routes/api/users', () => {
  before(() => {

  });

  describe('POST /', () => {
    it('returns 400 if body param email is missing');
    it('returns 400 if body param password is missing');
    it('returns 400 if body param username is missing');
    it('returns 201 on a successfully adding a new user');
  });

  describe('GET /:id/addresses', () => {
    authenticationTests('get', '/api/users/1/addresses');
    it('needs tests');
  });

  describe('POST /:id/addresses', () => {
    authenticationTests('post', '/api/users/1/addresses');
    it('needs tests');
  });

  describe('DELETE /:id/addresses/:address', () => {
    authenticationTests('delete', '/api/users/1/addresses/abcdefg1234567');
    it('needs tests');
  });

  after(() => {

  });
});
