var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hbs = require('express-handlebars');
var permissions = require('./permission');
var lang = require('./lang');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var authRouter = require('./routes/auth');
require('dotenv').config()
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine( 'hbs', hbs( { 
  extname: 'hbs', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(permissions);
app.use(lang);


const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//add local variables
app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    res.locals.username = req.user.username;
  }
  next();
});

// mongodb connection
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => {
  console.error(err);
});

// routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/user', userRouter);
// hbs.registerPartials(__dirname + '/views/partials');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
