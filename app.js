require ("./api/data/db.js");


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



//
// //initialize models
 var Model = require('./api/data/notices.model.js');
//
var index = require('./api/routes/index');
// var api = require('./routes/api');
var authenticate = require('./api/routes/authenticate');
//
//
 var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
 // uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('port', 5000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(session({
  secret: 'notices',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());




//
// //// Initialize Passport
// //var initPassport = require('./passport-init');
passport.use(new LocalStrategy(Model.authenticate()));
passport.serializeUser(Model.serializeUser());
passport.deserializeUser(Model.deserializeUser());
// //initPassport(passport);
//




app.use('/', index);
// app.use('/api', api);
app.use('/auth', authenticate);
//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//
// // error handlers
//
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//
//
//module.exports = app;
var server = app.listen(app.get('port'),function () {
	// body...
	var port = server.address().port;
	console.log('Magic happens on port '+ port);
});


module.exports = app;
