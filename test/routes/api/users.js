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

const goodBearerToken = jwt.sign({
  id: 1,
  username: 'John Doe'
}, config.jwtSecret);

const badBearerToken = jwt.sign({
  id: 99,
  username: 'Unknown User'
}, config.jwtSecret);

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
        fetchAll: () => Promise.resolve([mockFetchReturnObj])
      });

    sinon.stub(axios, 'get');

    axios.get.withArgs('https://api.blockcypher.com/v1/btc/test3/addrs/abcdefg1234567/full').returns(Promise.resolve({
      data: {
        address: 'abcdefg1234567',
        foo: 'bar',
        txs: [{
          hash: 'abc',
          biz: 'baz'
        }]
      }
    }));
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

    it('returns a 401 if the authorized user is trying to access not their addresses', () =>
      request(app)
        .get('/api/users/1/addresses')
        .set('authorization', `Bearer ${badBearerToken}`)
        .expect(401)
    );

    it('returns a 200 and a correct json object', () =>
      request(app)
        .get('/api/users/1/addresses')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.deep.equal({
            abcdefg1234567: {
              address: 'abcdefg1234567',
              foo: 'bar',
              txs: {
                abc: {
                  hash: 'abc',
                  biz: 'baz'
                }
              }
            }
          });
          expect(axios.get).to.have.been.calledWith('https://api.blockcypher.com/v1/btc/test3/addrs/abcdefg1234567/full');
        })
    );
  });

  describe('POST /:id/addresses', () => {
    authenticationTests('post', '/api/users/1/addresses');

    it('returns a 401 if the authorized user is trying to access not their addresses', () =>
      request(app)
        .get('/api/users/1/addresses')
        .set('authorization', `Bearer ${badBearerToken}`)
        .expect(401)
    );

    it('needs tests');
  });

  describe('DELETE /:id/addresses/:address', () => {
    authenticationTests('delete', '/api/users/1/addresses/abcdefg1234567');
    it('needs tests');
  });
});
