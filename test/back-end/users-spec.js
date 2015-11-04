require('./utils');
var request = require('supertest'),
    should = require('chai').should(),
    app = require('../../index').app;

describe('users list', function() {
  it('should list users', function(done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200, done)
  })
});
