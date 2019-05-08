var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var firebase = require('firebase');
const cors = require('cors')

var config = {
  apiKey: "AIzaSyC_PXtAD4_mHIZDvBHwlilhY-c_AN3B0qY",
  authDomain: "ertia-1555997688215.firebaseapp.com",
  databaseURL: "https://ertia-1555997688215.firebaseio.com",
  storageBucket: "gs://ertia-1555997688215.appspot.com/",
};
firebase.initializeApp(config);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', require('./routes/api'));
app.use(express.static(path.join(__dirname, 'fe', 'dist')));

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
  res.send({ msg: err.message })
});

module.exports = app;
