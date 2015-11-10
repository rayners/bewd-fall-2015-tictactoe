var express = require('express');
var app = express.Router();

var User = require('../models').user;

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
      var warning;
      if (user) {
        if (user.password === req.body.password) {
          req.session.user_id = user.id;
          req.session.save(function() {
            res.format({
              html: function() {
                req.flash('success', "Logged in!");
                res.redirect('/games')
              },
              json: function() {
                res.json({ success: true, message: 'Loggin in!' });
              }
            })
          });
        } else { // user.password === req.body.password
          warning = 'Bad password. Try ' + user.password + ' instead.'
          res.format({
            html: function() {
              req.flash('warning', warning);
              req.session.save(function() {
                res.render('login');
              });
            },
            json: function() {
              res.json({ success: false, errors: [warning]});
            }
          })
        }
      } else { // user
        warning = 'Username unknown';
        res.format({
          html: function() {
            req.flash('warning', warning);
            req.session.save(function() {
              res.render('login');
            });
          },
          json: function() {
            res.status(404).json({ success: false, errors: [warning]})
          }
        })
      }
    });
});

module.exports = app;
