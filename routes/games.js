var express = require('express');
var app = express.Router();

var models = require('../models');

app.get('/', function(req, res) {
    models.Board.findAll().then(function(boards) {
      if (req.session.user_id) {
        models.User.findById(req.session.user_id).then(function(user) {
          res.render('games', { boards: boards, user: user });
        })
      } else {
        res.render('games', { boards: boards });
      }
    });
});

app.get('/:game_id', function(req, res) {
    models.Board.findById(req.params.game_id).then(function(board) {
      res.render('individualGame', { board: board });
    });
});

app.post('/', function(req, res) {
    models.Board.create({ board: req.body.board })
        .then(function(board) {
            res.redirect('/games/' + board.id);
        })
        .catch(function(errors) {
          models.Board.findAll().then(function(boards) {
            res.render('games', { boards: boards, errors: errors });
          });
        });
});

module.exports = app;
