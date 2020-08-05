var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('./configs/passport');

var problemsRouter = require('./routes/problems');
var submissionsRouter = require('./routes/submissions');
var usersRouter = require('./routes/users');
var contestsRouter = require('./routes/contests');


const InitiateMongoServer = require("./configs/db");

var app = express();

// Initiate Mongo Server
InitiateMongoServer();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Authentication
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
// ROUTES
app.get('/', function (req, res) {
  res.render('layout', { content: 'index' });
});

app.use('/problems', problemsRouter);
app.use('/submissions', submissionsRouter);
app.use('/users', usersRouter);
app.use('/contests', contestsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
