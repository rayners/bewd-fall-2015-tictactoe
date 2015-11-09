// routes/users.js
var express = require('express');
var router = express.Router();

var User = require('../models').user;

router.get('/', function(req, res) {
  var page = req.query.page || 1;
  User.findAndCount({ attributes: ['id', 'username', 'email' ], limit: 5, offset: (page - 1) * 5 })
    .then(function(results) {
      var users = results.rows;
      res.json({ total: results.count, users: users });
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
