require('./utils');
var request = require('supertest'),
    should = require('chai').should(),
    app = require('../../index').app;

describe('users list', function() {
  it('should list users', function(done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return no users when there are not any', function(done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect({ users: [] }, done);
  });

  it('should return a single user when there is only one', function(done) {
    var user = require('../../models').user;
    user.create({ username: 'abc123', password: 'mypassword', email: 'user@example.com' })
      .then(function(u) {
        request(app)
          .get('/users')
          .set('Accept', 'application/json')
          .expect({ users: [ { username: 'abc123', password: 'mypassword', email: 'user@example.com' } ] }, done)
      })
  })
});
