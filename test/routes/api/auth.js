'use strict';

describe('routes/api/auth', () => {
  describe('POST /', () => {
    it('returns BadRequest error via next() if email or password are missing');

    it('returns Unauthorized error via next() if email exists, but password does not match');

    it('returns a json web token if email and password are correct');
  });
});
