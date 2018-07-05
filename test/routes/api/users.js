'use strict';

const request = require('supertest');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const User = require('../../../models/user');
const Address = require('../../../models/address');
const config = require('../../../config');
const authenticationTests = require('../../middleware/authenticate');

describe('routes/api/users', () => {
  before(() => {
    sinon.stub(User.prototype, 'save');

    User.prototype.save.returns(Promise.resolve({
      attributes: {
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        passwordDigest: 'super-secret',
        createdAt: 'now',
        updatedAt: 'now'
      }
    }));

    sinon.stub(Address, 'query');

    const passwordDigest = bcrypt.hashSync('test123', 10);

    const mockFetchReturnObj = {
      get: key => mockFetchReturnObj[key],
      id: 1,
      key: 'abcdefg1234567',
      userId: '1',
      eventId: 'event1'
    };

    Address.query
      .withArgs({ where: { user_id: '1' } })
      .returns({
        fetchAll: () => Promise.resolves([mockFetchReturnObj])
      });

    sinon.stub(axios, 'get');

    axios.get.withArgs('https://api.blockcypher.com/v1/btc/test3/addrs/abcdefg123456/full').returns({
      data: [{

      }]
    });
  });

  after(() => {
    User.prototype.save.restore();
    Address.query.restore();
    axios.get.restore();
  });

  describe('POST /', () => {
    it('returns 400 if body param email is missing', () =>
      request(app)
        .post('/api/users')
        .send({ password: 'test123', username: 'John Doe' })
        .expect(400)
    );

    it('returns 400 if body param password is missing', () =>
      request(app)
        .post('/api/users')
        .send({ email: 'john.doe@gmail.com', username: 'John Doe' })
        .expect(400)
    );

    it('returns 400 if body param username is missing', () =>
      request(app)
        .post('/api/users')
        .send({ email: 'john.doe@gmail.com', password: 'test123' })
        .expect(400)
    );

    it('returns 201 on a successfully adding a new user', () =>
      request(app)
        .post('/api/users')
        .send({ email: 'john.doe@gmail.com', password: 'test123', username: 'John Doe' })
        .expect(201)
        .then(res => {
          expect(res.body).to.deep.equal({
            username: 'John Doe',
            email: 'john.doe@gmail.com',
            createdAt: 'now',
            updatedAt: 'now'
          });
        })
    );
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
});
