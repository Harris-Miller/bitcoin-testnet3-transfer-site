'use strict';

const request = require('supertest');
const app = require('../../../app');

describe('route/api/callbacks', () => {
  before(() => {
    // mock sockets.emit
    // req.sockets === app.io.sockets
    sinon.stub(app.io.sockets, 'emit');
  });

  describe('POST /transaction/:address', () => {
    it('returns a 204 and emits data via socket.io', () => 
      request(app)
        .post('/api/callbacks/transaction/abcdefg1234567')
        .send({ foo: 'bar' })
        .expect(204)
        .then(() => expect(app.io.sockets.emit).to.have.been.calledWith('transaction', { address: 'abcdefg1234567', txs: { foo: 'bar' } }))
    );
  });

  after(() => {
    app.io.sockets.emit.restore();
  });
});
