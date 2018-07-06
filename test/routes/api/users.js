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

const { BLOCKCYPHER_TOKEN, APP_URL } = process.env;

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

    function getMockFetchReturnObj() {
      const mockFetchReturnObj = {
        get: key => mockFetchReturnObj[key],
        destroy: () => Promise.resolve(),
        id: 1,
        key: 'abcdefg1234567',
        userId: '1',
        eventId: 'event1'
      };

      return mockFetchReturnObj;
    }

    Address.query
      .withArgs({ where: { user_id: '1' } })
      .returns({
        fetchAll: () => Promise.resolve([getMockFetchReturnObj()]),
      });

    // we call this multiple times in order
    // and ned the different results in this order
    Address.query
      .withArgs({ where: { user_id: '1', key: 'abcdefg1234567'}})
      .onCall(0)
      .returns({
        fetch: () => Promise.resolve(getMockFetchReturnObj())
      });

    Address.query
      .withArgs({ where: { user_id: '1', key: 'abcdefg1234567'}})
      .onCall(1)
      .returns({
        fetch: () => Promise.resolve(null)
      });

    Address.query
      .withArgs({ where: { user_id: '1', key: 'abcdefg1234567'}})
      .onCall(2)
      .returns({
        fetch: () => Promise.resolve(null)
      });

    Address.query
      .withArgs({ where: { user_id: '1', key: 'abcdefg1234567'}})
      .onCall(3)
      .returns({
        fetch: () => Promise.resolve(getMockFetchReturnObj())
      });

    sinon.stub(Address.prototype, 'save');

    Address.prototype.save.returns(Promise.resolve(getMockFetchReturnObj()));

    sinon.stub(axios, 'get');

    function getFullAddressData() {
      return Promise.resolve({
        data: {
          address: 'abcdefg1234567',
          foo: 'bar',
          txs: [{
            hash: 'abc',
            biz: 'baz'
          }]
        }
      });
    }

    // we have to do this because sinon caches the returns, and we need a fresh object on each return
    // it's stupid
    axios.get
      .withArgs('https://api.blockcypher.com/v1/btc/test3/addrs/abcdefg1234567/full')
      .onCall(0)
      .returns(getFullAddressData())
      .onCall(1)
      .returns(getFullAddressData())
      .onCall(2)
      .returns(getFullAddressData());

    sinon.stub(axios, 'post');

    axios.post.withArgs(`https://api.blockcypher.com/v1/btc/test3/hooks?token=${BLOCKCYPHER_TOKEN}`, {
      event: 'tx-confirmation',
      address: 'abcdefg1234567',
      url: `${APP_URL}/api/callbacks/transaction/abcdefg1234567`
    }).returns(Promise.resolve({
      data: {}
    }));

    sinon.stub(axios, 'delete');

    axios.delete.returns(Promise.resolve({}));
  });

  after(() => {
    User.prototype.save.restore();
    Address.query.restore();
    Address.prototype.save.restore();
    axios.get.restore();
    axios.post.restore();
    axios.delete.restore();
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
        .post('/api/users/1/addresses')
        .set('authorization', `Bearer ${badBearerToken}`)
        .expect(401)
    );

    it('returns a 400 if request body is missing param key', () =>
      request(app)
        .post('/api/users/1/addresses')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .expect(400)
    );

    it('returns a 201 if the key in the body already exists in the database, and returns the full address object', () =>
      request(app)
        .post('/api/users/1/addresses')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .send({ key: 'abcdefg1234567' })
        .expect(201)
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
        })
    );

    it('returns a 201 if the key is new, and returns the full address object', () =>
      request(app)
        .post('/api/users/1/addresses')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .send({ key: 'abcdefg1234567' })
        .expect(201)
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
        })
    );
  });

  describe('DELETE /:id/addresses/:address', () => {
    authenticationTests('delete', '/api/users/1/addresses/abcdefg1234567');

    it('returns a 401 if the authorized user is trying to access not their addresses', () =>
      request(app)
        .delete('/api/users/1/addresses/abcdefg1234567')
        .set('authorization', `Bearer ${badBearerToken}`)
        .expect(401)
    );

    it('returns a 400 if the address key does not exist for the user', () =>
      request(app)
        .delete('/api/users/1/addresses/abcdefg1234567')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .expect(400)
    );

    it('returns a 204 if the key exist,', () =>
      request(app)
        .delete('/api/users/1/addresses/abcdefg1234567')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .expect(204)
    );
  });
});
