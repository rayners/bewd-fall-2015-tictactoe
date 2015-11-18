// roles.js

var ConnectRoles = require('connect-roles');

var roles = new ConnectRoles();

roles.use('access admin page', function(req) {
  // rayners is the admin
  return req.currentUser && req.currentUser.username === ''; // TODO: Set this
});

roles.use('verified user', function(req) {
  return req.currentUser && req.currentUser.isEmailVerified();
});

module.exports = roles;
