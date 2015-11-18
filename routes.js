
var express = require('express');
var app = express.Router();

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    return !!req.currentUser;
  };
  if (req.session.user_id) {
    models.user.findById(req.session.user_id).then(function(user) {
      if (user) {
        console.log("User logged in as " + user.username);
        req.currentUser = res.locals.currentUser = user;
      }
      next();
    });
  } else {
    next();
  }
});

var roles = require('./roles');
app.use(roles.middleware({ userProperty: 'currentUser' }));

app.get('/', function(req, res) {
  res.render('index');
});

var models = require('./models');

app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login'));
app.use('/admin', require('./routes/admin'));

app.get('/*', function(req, res) {
  res.render('index');
});

module.exports = app;
