require('./utils');
var request = require('supertest'),
    should = require('chai').should(),
    app = require('../../index').app;

describe('user registration', function() {
  it('should require a password to register', function(done) {
    request(app)
      .post('/register')
      .send({ username: 'iHaveNoPassword'})
      .expect(200)
      .end(function(err, res) {
        res.text.should.include('Password required');
        done();
      });
  });
  it('should allow a user to register with a password', function(done) {
    request(app)
      .post('/register')
      .send({ username: 'abc123', password: 'Secrets' })
      .expect(302) // successful post means a redirect
      .end(function(err, res) {
        require('../../models').user.findOne({ username: 'abc123' })
          .then(function(user) {
            user.should.not.be.undefined;
            done();
          })
      });
  });

  it('should not allow a user to register for a user name that exists', function(done) {
    
    // ...
    done();
  })
});
