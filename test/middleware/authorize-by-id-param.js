'user strict';

const request = require('supertest');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const authorizeByIdParam = require('../../middleware/authorize-by-id-param');
const config = require('../../config');

describe('middleware/authorize-by-id-param', () => {
  it('returns a 500 if not user with authenticate middleware', () => {
    const next = sinon.spy();

    authorizeByIdParam({}, {}, next);

    expect(next).to.have.been.calledWithMatch(sinon.match.instanceOf(Error));
  });

  it('returns a 500 if not used on a route with an id param', () => {
    const req = { userId: 1, params: {} }
    const next = sinon.spy();

    authorizeByIdParam(req, {}, next);

    expect(next).to.have.been.calledWithMatch(sinon.match.instanceOf(Error));
  });

  it('returns a 401 if req.userId !== req.params.id', () => {
    const req = { userId: 1, params: { id: 2 } }
    const next = sinon.spy();

    authorizeByIdParam(req, {}, next);

    expect(next).to.have.been.calledWithMatch(sinon.match.instanceOf(createError.Unauthorized));
  });

  it('returns calls next if req.userId === req.params.id', () => {
    const req = { userId: 1, params: { id: 1 } }
    const next = sinon.spy();

    authorizeByIdParam(req, {}, next);

    expect(next).to.have.been.calledWith();
  });
});

const bearerToken = jwt.sign({
  id: 999,
  username: 'John Doe'
}, config.jwtSecret);

function authorizeByIdParamTests(method, route, bearerToken) {
  it('returns 401 if current user does not match id param', async () => {
    await request(app)[method](route)
      .set('authorization', `Bearer ${bearerToken}`)
      .expect(401);
  });
}

module.exports = authorizeByIdParamTests;
