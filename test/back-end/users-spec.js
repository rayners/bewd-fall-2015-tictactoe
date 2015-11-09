require('./utils');
var request = require('supertest'),
    should = require('chai').should(),
    app = require('../../index').app;

var _ = require('lodash');

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
      .expect({ users: [], total: 0 }, done);
  });

  it('should return a single user when there is only one', function(done) {
    var user = require('../../models').user;
    user.create({ username: 'abc123', password: 'mypassword', email: 'user@example.com' })
      .then(function(u) {
        request(app)
          .get('/users')
          .set('Accept', 'application/json')
          .expect({ users: [ { id: u.id, username: 'abc123', email: 'user@example.com' } ], total: 1 }, done);
      });
  });

  it('should return two users when there are two', function(done) {
    var user = require('../../models').user;
    user.bulkCreate([
      { username: 'user1', password: 'mypassword', email: 'user1@mysite.com' },
      { username: 'user2', password: 'nottelling', email: 'user2@gmail.web' }
    ]).then(function() {
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect({ users: [ { id: 1, username: 'user1', email: 'user1@mysite.com' },
                           { id: 2, username: 'user2', email: 'user2@gmail.web'  } ],
                  total: 2 }, done);
    });
  });

  it('should return five users when there are six', function(done) {
    var user = require('../../models').user;
    user.bulkCreate(_.map(_.times(6), function(i) {
      return { username: 'user' + i, password: 'password' + i, email: 'user' + i + '@gmail.web' };
    })).then(function(users) {
      users.should.have.length(6);
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          res.body.users.should.have.length(5);
          res.body.users[0].username.should.equal('user0');
          res.body.total.should.equal(6);
          done();
        });
    });
  });

  it('should return the next five users after the initial five (page=2)', function(done) {
    var user = require('../../models').user;
    user.bulkCreate(_.map(_.times(10), function(i) {
      return { username: 'user' + i, password: 'password' + i, email: 'user' + i + '@gmail.web' };
    })).then(function(users) {
      users.should.have.length(10);
      request(app)
        .get('/users')
        .query({ page: 2 })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          res.body.users.should.have.length(5);
          res.body.users[0].username.should.equal('user5');
          res.body.total.should.equal(10);
          done();
        });
      });
  });

  it('should not fail in this case', function(done) {
    var user = require('../../models').user;
    user.bulkCreate(_.map(_.times(10), function(i) {
      return { username: 'user' + i, password: 'password' + i, email: 'user' + i + '@gmail.web' };
    })).then(function(users) {
      users.should.have.length(10);
      request(app)
        .get('/users')
        .query({ page: -1 })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          res.body.users.should.have.length(5);
          res.body.users[0].username.should.equal('user0');
          done();
        });
      });
  });
});
