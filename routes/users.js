// routes/users.js
var express = require('express');
var router = express.Router();

var User = require('../models').user;
var _ = require('lodash');

router.get('/', function(req, res) {
  User.findAll({ attributes: ['id', 'username', 'email' ]}).then(function(users) {
    res.json({ users: users });
  });
});

router.get('/usernameExists', function(req, res) {
  User.findOne({ where: { username: req.query.username }})
    .then(function(user) {
      if (user) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
});

module.exports = router;
