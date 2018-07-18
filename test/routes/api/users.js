'use strict';

const request = require('supertest');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const User = require('../../../models/user');
const Address = require('../../../models/address');
const config = require('../../../config');
const authenticationTests = require('../../middleware/authenticate');
const authorizeByIdParamTests = require('../../middleware/authorize-by-id-param');

const { BLOCKCYPHER_TOKEN, APP_URL } = process.env;

const goodBearerToken = jwt.sign({
  id: 1,
  username: 'John Doe'
}, config.jwtSecret);

const badBearerToken = jwt.sign({
  id: 99,
  username: 'Unknown User'
}, config.jwtSecret);

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

describe('routes/api/users', () => {
  before(() => {
    // can be used for all tests
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

    // behavior needs to be defined per test
    sinon.stub(Address, 'query');

    // can be used for all tests
    sinon.stub(Address.prototype, 'save');
    Address.prototype.save.returns(Promise.resolve(getMockFetchReturnObj()));

    // behavior needs to be done per tests
    sinon.stub(axios, 'get');

    // can be used for all tests
    sinon.stub(axios, 'post');
    axios.post.withArgs(`https://api.blockcypher.com/v1/btc/test3/hooks?token=${BLOCKCYPHER_TOKEN}`, {
      event: 'tx-confirmation',
      address: 'abcdefg1234567',
      url: `${APP_URL}/api/callbacks/transaction/abcdefg1234567`
    }).returns(Promise.resolve({
      data: {}
    }));

    // can be used for all tests
    sinon.stub(axios, 'delete');
    axios.delete.returns(Promise.resolve({}));
  });

  beforeEach(() => {
    Address.query.reset();
    axios.get.reset();
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
    it('returns 400 if body param email is missing', async () => {
      await request(app)
        .post('/api/users')
        .send({ password: 'test123', username: 'John Doe' })
        .expect(400);
    });

    it('returns 400 if body param password is missing', async () => {
      await request(app)
        .post('/api/users')
        .send({ email: 'john.doe@gmail.com', username: 'John Doe' })
        .expect(400);
    });

    it('returns 400 if body param username is missing', async () => {
      await request(app)
        .post('/api/users')
        .send({ email: 'john.doe@gmail.com', password: 'test123' })
        .expect(400);
    });

    it('returns 201 on a successfully adding a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'john.doe@gmail.com', password: 'test123', username: 'John Doe' })
        .expect(201);

      expect(res.body).to.deep.equal({
        username: 'John Doe',
        email: 'john.doe@gmail.com',
        createdAt: 'now',
        updatedAt: 'now'
      });
    });
  });

  describe('GET /:id/addresses', () => {
    beforeEach(() => {
      Address.query
        .withArgs({ where: { user_id: '1' } })
        .returns({
          fetchAll: () => Promise.resolve([getMockFetchReturnObj()])
        });
    });

    authenticationTests('get', '/api/users/1/addresses');

    authorizeByIdParamTests('get', '/api/users/1/addresses', badBearerToken);

    it('returns a 200 and a correct json object', async () => {
      axios.get
        .withArgs('https://api.blockcypher.com/v1/btc/test3/addrs/abcdefg1234567/full')
        .returns(getFullAddressData());

      const res = await request(app)
        .get('/api/users/1/addresses')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .expect(200);

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
    });
  });

  describe('POST /:id/addresses', () => {
    authenticationTests('post', '/api/users/1/addresses');

    authorizeByIdParamTests('post', '/api/users/1/addresses', badBearerToken);

    it('returns a 400 if request body is missing param key', async () => {
      await request(app)
        .post('/api/users/1/addresses')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .expect(400);
    });

    it('returns a 201 if the key in the body already exists in the database, and returns the full address object', async () => {
      Address.query
        .withArgs({ where: { user_id: '1', key: 'abcdefg1234567' } })
        .returns({
          fetch: () => Promise.resolve(getMockFetchReturnObj())
        });

      axios.get
        .withArgs('https://api.blockcypher.com/v1/btc/test3/addrs/abcdefg1234567/full')
        .returns(getFullAddressData());

      const res = await request(app)
        .post('/api/users/1/addresses')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .send({ key: 'abcdefg1234567' })
        .expect(201);

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
    });

    it('returns a 201 if the key is new, and returns the full address object', async () => {
      Address.query
        .withArgs({ where: { user_id: '1', key: 'abcdefg1234567' } })
        .returns({
          fetch: () => Promise.resolve(null)
        });

      axios.get
        .withArgs('https://api.blockcypher.com/v1/btc/test3/addrs/abcdefg1234567/full')
        .returns(getFullAddressData());

      const res = await request(app)
        .post('/api/users/1/addresses')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .send({ key: 'abcdefg1234567' })
        .expect(201);

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
    });
  });

  describe('DELETE /:id/addresses/:address', () => {
    authenticationTests('delete', '/api/users/1/addresses/abcdefg1234567');

    authorizeByIdParamTests('delete', '/api/users/1/addresses/abcdefg1234567', badBearerToken);

    it('returns a 400 if the address key does not exist for the user', async () => {
      Address.query
        .withArgs({ where: { user_id: '1', key: 'abcdefg1234567' } })
        .returns({
          fetch: () => Promise.resolve(null)
        });

      await request(app)
        .delete('/api/users/1/addresses/abcdefg1234567')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .expect(400);
    });

    it('returns a 204 if the key exist,', async () => {
      Address.query
        .withArgs({ where: { user_id: '1', key: 'abcdefg1234567' } })
        .returns({
          fetch: () => Promise.resolve(getMockFetchReturnObj())
        });

      await request(app)
        .delete('/api/users/1/addresses/abcdefg1234567')
        .set('authorization', `Bearer ${goodBearerToken}`)
        .expect(204);
    });
  });
});
