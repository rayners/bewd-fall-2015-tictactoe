var express = require('express');
var app = express();

require('express-debug')(app, {});

app.use('/bower_components',
  express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
var session = require('express-session');

var Sequelize = require('sequelize');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sequelize = new Sequelize(
  "database",
  "username",
  "password", {
    "dialect": "sqlite",
    "storage": "./store/session.sqlite"
  });

var store = new SequelizeStore({ db: sequelize });
store.sync();

app.use(cookieParser());
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'I see dead people',
  store: store
}));

app.use(require('flash')());

app.use(require('morgan')('dev'));

app.set('view engine', 'jade');

app.use(require('./routes'))

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
