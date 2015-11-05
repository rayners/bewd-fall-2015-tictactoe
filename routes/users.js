// routes/users.js
var express = require('express');
var router = express.Router();

var User = require('../models').user;

router.get('/', function(req, res) {
  res.json({ users: [] });
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
