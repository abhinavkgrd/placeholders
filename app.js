var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var problemsRouter = require('./routes/problems');
var usersRouter = require('./routes/users');
var contestRouter = require('./routes/users');
var problem_controller=require('./controllers/problemController');

var app = express();


var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://dbuser:strongPass@cluster0-jn6qi.mongodb.net/Codeforces_clone_db?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES

app.get('/',function(req,res){
  res.render('index');
});

app.use('/problems', problemsRouter);
app.use('/users', usersRouter);
app.use('/contests', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
