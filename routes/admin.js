// routes/admin.js

var express = require('express');
var router = express.Router();
var roles = require('../roles');

router.use(roles.can('access admin page'));

router.use(function(req, res, next) {
  res.locals.path = req.baseUrl + req.path;
  next();
});

router.get('/', function(req, res) {
  res.send('Hi admin!');
});

module.exports = router;
