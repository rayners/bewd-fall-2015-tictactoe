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
          .expect({ users: [ { id: u.id, username: 'abc123', email: 'user@example.com' } ] }, done);
      });
  });

  it('should return two users when there are two', function(done) {
    var user = require('../../models').user;
    user.bulkCreate([
      { username: 'user1', password: 'mypassword', email: 'user1@mysite.com' },
      { username: 'user2', password: 'nottelling', email: 'user2@gmail.web' }
    ]).then(function(users) {
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect({ users: [ { id: 1, username: 'user1', email: 'user1@mysite.com' },
                           { id: 2, username: 'user2', email: 'user2@gmail.web'  } ]}, done);
    });
  });
});
