'use strict';

const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../../../app');
const User = require('../../../models/user');
const config = require('../../../config');

describe('routes/api/auth', () => {
  describe('POST /', () => {
    before(() => {
      sinon.stub(User, 'query');

      User.query.withArgs({ where: { email: 'notInDatabase@gmail.com' } }).returns({
        fetch: () => Promise.resolve(null)
      });

      const passwordDigest = bcrypt.hashSync('test123', 10);

      const fetchObj = {
        get: key => fetchObj[key],
        id: 1,
        email: 'example@gmail.com',
        username: 'example',
        passwordDigest
      };

      User.query.withArgs({ where: { email: 'example@gmail.com' } }).returns({
        fetch: () => Promise.resolve(fetchObj)
      });
    });

    after(() => {
      User.query.restore();
    });

    it('returns 400 if email or password are missing', () => {
      return request(app)
        .post('/api/auth')
        .expect(400);
    });

    it('returns 401 if email is not found in database', () => {
      return request(app)
        .post('/api/auth')
        .send({ email: 'notInDatabase@gmail.com', password: 'test123' })
        .expect(401);
    });

    it('returns 401 error via next() if email exists, but password does not match', () => {
      return request(app)
        .post('/api/auth')
        .send({ email: 'example@gmail.com', password: 'notCorrect' })
        .expect(401);
    });

    it('returns 200 with json web token if email and password are correct', () => {
      const expectedToken = jwt.sign({
        id: 1,
        username: 'example'
      }, config.jwtSecret);

      return request(app)
        .post('/api/auth')
        .send({ email: 'example@gmail.com', password: 'test123' })
        .expect(200)
        .then(res => {
          expect(res.body.token).to.equal(expectedToken);
        });
    });
  });
});
