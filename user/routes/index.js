var express = require('express');
var router = express.Router();
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyC_PXtAD4_mHIZDvBHwlilhY-c_AN3B0qY",
  authDomain: "ertia-1555997688215.firebaseapp.com",
  databaseURL: "https://ertia-1555997688215.firebaseio.com",
  projectId: "ertia-1555997688215",
  storageBucket: "ertia-1555997688215.appspot.com",
  messagingSenderId: "74935867220",
  appId: "1:74935867220:web:c40113ac2d7ca333"
};
firebase.initializeApp(config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'home' });
});

router.post('/', function(req, res, next) {
  var district = req.body.district;
  var startX;
  var startY;
  firebase.database().ref('destination/').child(district).child('startp').once('value', function(snapshot){
    var childData = snapshot.val();
    console.log(childData);
    startX=childData.long;
    startY=childData.lat;
    console.log(startX);
  console.log(startY);
  });

  firebase.database().ref('trashBins/').orderByChild('district').equalTo(district).once('value', function(snapshot) {
    var childData = snapshot.val();
     console.log(childData);
     if(childData==null){
       res.render('index',{title:'index', row:null, datasize:0});
     }
     var keys = Object.keys(childData);
     var data = [];
     var datasize = 0;
     keys.forEach(function(key){
       var title = childData[key].title;
       var Lat = childData[key].lat;
       var Long = childData[key].long;
       data.push({name: title, lat: Lat, long: Long});
       datasize=datasize+1;

     });
     console.log('here!!!');
     console.log(startX);
  console.log(startY);
    res.render('index', { title:'index', row: data, datasize, sX: startX, sY: startY});
  });
});

router.get('/index', function(req, res, next) {
  firebase.database().ref('trashBins/').once('value', function(snapshot) {
    var childData = snapshot.val();
     console.log(childData);
     var keys = Object.keys(childData);
     var data = [];
     var datasize = 0;
     keys.forEach(function(key){
       var title = childData[key].title;
       var Lat = childData[key].lat;
       var Long = childData[key].long;
       data.push({name: title, lat: Lat, long: Long});
       datasize=datasize+1;
     });
    res.render('index', { title:'index', row: data, datasize});
  }); 
});

module.exports = router;
