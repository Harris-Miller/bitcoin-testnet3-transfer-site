'use strict';

const request = require('supertest');
const createError = require('http-errors');
const app = require('../../app');
const authenticate = require('../../middleware/authenticate');

describe('middleware/authenticate', () => {
  it('returns Forbidden error via next() if no token is provided', () => {
    const req = {
      get() {
        return null;
      }
    };
    const res = {};
    const next = sinon.spy();

    authenticate(req, res, next);

    expect(next).to.have.been.calledWithMatch(sinon.match.instanceOf(createError.Forbidden));
  });

  it('returns Forbidden error via next() if authorization header is not a Bearer token', () => {
    const req = {
      get(key) {
        if (key === 'authorization') {
          return 'abcdefg1234567';
        }

        return null;
      }
    };
    const res = {};
    const next = sinon.spy();

    authenticate(req, res, next);

    expect(next).to.have.been.calledWithMatch(sinon.match.instanceOf(createError.Forbidden));
  });

  it('returns Unauthorized error via next() if token vannot be verified', () => {
    const req = {
      get(key) {
        if (key === 'authorization') {
          return 'Bearer abcdefg1234567';
        }

        return null;
      }
    };
    const res = {};
    const next = sinon.spy();

    authenticate(req, res, next);

    expect(next).to.have.been.calledWithMatch(sinon.match.instanceOf(createError.Unauthorized));
  });

  it('sets req.userId on verified token', () => {
    const req = {
      get(key) {
        if (key === 'authorization') {
          // this auth key is from testing, and decodes with id === 1
          return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYXJyaXMgTWlsbGVyIiwiaWF0IjoxNTMwNTY4NjM5fQ.C-puSgL_CSqmIztQ6Yy91v2tfMZ02B3ziS5evmvKdgM';
        }

        return null;
      }
    };
    const res = {};
    const next = sinon.spy();

    authenticate(req, res, next);

    expect(req.userId).to.equal(1);
    expect(next).to.have.been.called();
  });
});

// a group of tests to run for all routes that use this middleware
function authenticationTests(method, route) {
  it('returns 403 is no Authorization token present', () => 
    request(app)[method](route)
      .expect(403)
  );

  it('returns 401 is token cannot be decoded', () => {
    request(app)[method](route)
      .set('Authorization', 'Bearer abcdefg1234567')
      .expect(401)
  });
}

module.exports = authenticationTests;