var express = require('express');
var app = express.Router();

var Board = require('../models').Board;

app.param('game_id', function(req, res, next) {
  Board.findById(req.params.game_id).then(function(b) {
    req.board = res.locals.board = b;
    next();
  });
});

app.get('/', function(req, res) {
    Board.findAll().then(function(boards) {
        res.render('games', { boards: boards });
    });
});

app.get('/:game_id', function(req, res) {
  res.render('individualGame');
});

app.get('/:game_id/players', function(req, res) {
  res.render('gamePlayers');
})

app.post('/', function(req, res) {
    Board.create({ board: req.body.board })
        .then(function(board) {
            res.redirect('/games/' + board.id);
        })
        .catch(function(errors) {
          Board.findAll().then(function(boards) {
            res.render('games', { boards: boards, errors: errors });
          });
        });
});

module.exports = app;
