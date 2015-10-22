// routes/users.js
var express = require('express');
var router = express.Router();

var User = require('../models').user;

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

router.get('/verify', function(req, res) {
  // stuff here
});

module.exports = router;
