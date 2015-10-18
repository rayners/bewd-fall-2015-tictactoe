var express = require('express');
var app = express.Router();

var User = require('../models').User;

app.get('/', function(req, res) {
  if (req.currentUser) {
    req.flash('info', "Dude. Come on.");
    req.session.save(function() {
      res.redirect('/games')
    });
  } else {
    res.render('login');
  }
});

app.post('/', function(req, res) {
  User.find({ where: { username: req.body.username }})
    .then(function(user) {
      if (user) {
        if (user.password === req.body.password) {
          req.session.user_id = user.id;
          req.flash('success', "Logged in!");
          req.session.save(function() {
            res.redirect('/games')
          });
        } else { // user.password === req.body.password
          req.flash('warning', 'Bad password. Try ' + user.password + ' instead.');
          req.session.save(function() {
            res.redirect('/login');
          });
        }
      } else { // user
        req.flash('warning', 'Username unknown');
        req.session.save(function() {
          res.redirect('/login');
        });
      }
    });
});

module.exports = app;
