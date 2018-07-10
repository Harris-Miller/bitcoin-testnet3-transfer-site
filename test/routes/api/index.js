'use strict';

const request = require('supertest');
const app = require('../../../app');

describe('route/api/index', () => {
  describe('POST /transaction/:address', () => {
    it('returns a 404 for not found routes', async () => {
      await request(app)
        .post('/api/not/a/route')
        .expect(404);
    });
  });
});
