require('./utils');
require('chai').should();

var request = require('supertest'),
    app = require('../../index').app;

describe('login page', function() {
  it('should not allow an unknown user to login', function(done) {
    done();
  });

  describe('when a user exists', function() {
    it('should allow a that user to login with the correct password', function(done) {
      done();
    });

    it('should not allow that user to login without the correct password', function(done) {
      done();
    });
  });
});
