var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyC_PXtAD4_mHIZDvBHwlilhY-c_AN3B0qY",
  authDomain: "ertia-1555997688215.firebaseapp.com",
  databaseURL: "https://ertia-1555997688215.firebaseio.com",
  storageBucket: "gs://ertia-1555997688215.appspot.com/",
};
var fapp = firebase.initializeApp(config);
var db = fapp.database();

var trashbinRef=db.ref('trashBins');

router.get('/', function(req, res, next) {
  const tb = [
    {name: '박규빈', district: '중랑구'},
    {name: '강인솔', district: '중구'},
    {name: '차민형', district: '동대문구'}
  ]
  res.send({ trashbins: tb })
});

// router.get('/add', function(req,res,next){
//   trashbinRef.push(req)
// });

router.add = function(req){
  console.log('add trash bin');
  trashbinRef.push(req);
}

router.all('*', function(req, res, next) {
  next(createError(404, 'Error'));
});

module.exports = router;
