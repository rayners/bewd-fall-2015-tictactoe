var express = require('express');
var app = exports.app = express();

// configuration from Heroku
app.set('port', process.env.PORT || 3000);

app.use('/bower_components',
  express.static(__dirname + '/bower_components'));
app.use('/public', express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
if (process.env.REDIS_URL) {
  var RedisStore = require('connect-redis')(session);

  app.use(session({
    store: new RedisStore({ url: process.env.REDIS_URL }),
    secret: 'I see undead people',
    saveUninitialized: false,
    resave: false
  }));
} else {
  // var Sequelize = require('sequelize');
  // var SequelizeStore = require('connect-session-sequelize')(session.Store);

  // var sequelize = new Sequelize(
  //   "database",
  //   "username",
  //   "password", {
  //     "dialect": "sqlite",
  //     "storage": "./store/session.sqlite"
  //   });

  // var store = new SequelizeStore({ db: sequelize });
  // store.sync();
  // app.use(session({
  //   saveUninitialized: false,
  //   resave: false,
  //   secret: 'I see dead people',
  //   store: store
    // }));
    app.use(session({ secret: 'abc' }));
}

app.use(require('flash')());

app.use(require('morgan')('dev'));

app.set('view engine', 'jade');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use(require('./routes'));

if (process.env.NODE_ENV !== 'test') {
  var server = exports.server = app.listen(app.get('port'), function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
}
