require('./utils');
require('chai').should();

var request = require('supertest'),
    app = require('../../index').app,
    _ = require('lodash');

describe('login page', function() {
  it('should not allow an unknown user to login', function(done) {
    // is this the right behavior?
    // are we passing enough to the backend to be a valid test?
    request(app)
      .post('/login')
      .send({ username: 'abc123' })
      .set('Accept', 'application/json')
      .expect({ success: false, errors: ['Username unknown'] }, done);
  });

  describe('when a user exists', function() {
    beforeEach(function(done) {
      require('../../models').user
        .create({ username: 'abc123', password: 'NotTelling' })
        .then(_.ary(done, 0));
    })

    it('should allow a that user to login with the correct password', function(done) {
      done();
    });

    it('should not allow that user to login without the correct password', function(done) {
      done();
    });
  });
});
