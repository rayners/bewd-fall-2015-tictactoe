var express = require('express');
var app = express.Router();

var Board = require('../models').Board;

app.param('game_id', function(req, res, next) {
  Board.findById(req.params.game_id).then(function(b) {
    if (b) {
      req.board = res.locals.board = b;
      next();
    } else {
      res.status(404).send('Game not found');
    }
  });
});

var accepts = {
  'json': 'application/json',
  'html': 'text/html'
};

app.param('format', function checkFormat(req, res, next, param) {
  req.headers.accept = accepts[param];
  next();
});

app.get('/', function(req, res) {
    Board.findAll().then(function(boards) {
      res.format({
          html: function() {
            res.render('games', { boards: boards });
          },
          json: function() {
            res.json(boards);
          }
      })
    });
});

app.get('/available', function(req, res) {
  Board.scope('available').findAll().then(function(boards) {
    res.render('games', { title: "Available Games",
                          boards: boards });
  })
});

app.get('/:game_id.:format?', function(req, res) {
  res.format({
      html: function() {
        res.render('individualGame');
      },
      json: function() {
        res.json(req.board);
      }
  });
});

app.get('/:game_id/players', function(req, res) {
  res.render('gamePlayers');
})

// create a fresh new game
app.post('/', function(req, res) {
    Board.create({ board: '         ' })
        .then(function(board) {
            res.redirect('/games/' + board.id);
        })
        .catch(function(errors) {
          Board.findAll().then(function(boards) {
            res.render('games', { boards: boards, errors: errors });
          });
        });
});

app.post('/:game_id', function(req, res) {
  req.board.set('board', req.body.board);
  req.board.save().then(function(board) {
    res.format({
      html: function() {
        res.redirect('/games/' + board.id);
      },
      json: function() {
        res.json(board);
      }
    })
  })
  .catch(function(error) {
    res.format({
      html: function() {
        res.flash('error', error.message);
        req.session.save(function() {
          res.redirect('/games/' + req.board.id);
        });
      },
      json: function() {
        res.json(error);
      }
    });
  });
});


app.post('/:game_id/join', function(req, res) {
  if (!req.currentUser) {
    res.flash('warning', 'You need to be logged in to join a game');
    res.redirect('/games/' + req.board.id);
  } else {
    console.log('Adding user ' + req.currentUser.username + ' to game #' + req.board.id);
    if (req.body.asX) {
      req.board.setXPlayer(req.currentUser).then(function() {
        // render something
      })
    } else {
      req.board.setOPlayer(req.currentUser).then(function() {
        // render something
      });
    }
  }
});

module.exports = app;
