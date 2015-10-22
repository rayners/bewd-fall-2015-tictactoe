// roles.js

var ConnectRoles = require('connect-roles');

var roles = new ConnectRoles();

roles.use('access admin page', function(req) {
  // rayners is the admin
  return req.currentUser && req.currentUser.username === 'rayners';
});

roles.use('verified user', function(req) {
  return req.currentUser && req.currentUser.isEmailVerified();
});

roles.use('play game', function(req) {
  return req.board && req.currentUser
    && ((req.board.xPlayerId === req.currentUser.id) ||
        (req.board.oPlayerId === req.currentUser.id))
});

module.exports = roles;
