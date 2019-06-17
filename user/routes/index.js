var express = require('express');
var router = express.Router();
var firebase = require("firebase");

// firebase config need api key
var config = {
  apiKey: "AIzaSyC_PXtAD4_mHIZDvBHwlilhY-c_AN3B0qY",
  authDomain: "ertia-1555997688215.firebaseapp.com",
  databaseURL: "https://ertia-1555997688215.firebaseio.com",
  projectId: "ertia-1555997688215",
  storageBucket: "ertia-1555997688215.appspot.com",
  messagingSenderId: "74935867220",
  appId: "1:74935867220:web:c40113ac2d7ca333"
};

//firebase init
firebase.initializeApp(config);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'home' });
});

/* POST from form (district) */
router.post('/', function(req, res, next) {
  // get district information from form
  var district = req.body.district;
  var startX;
  var startY;

  // find destination that same as district
  // get start point, end point
  firebase.database().ref('destination/').child(district).child('startp').once('value', function(snapshot){
    var childData = snapshot.val();
    //console.log(childData);

    startX=childData.long;
    startY=childData.lat;
    //console.log(startX);
    //console.log(startY);
  });

  // find trashbins that location same as district
  firebase.database().ref('trashBins/').orderByChild('district').equalTo(district).once('value', function(snapshot) {
    var childData = snapshot.val();
     //console.log(childData);

     // if didn't find trashbin return null
     if(childData==null){
       res.render('index',{title:'index', row:null, datasize:0});
     }
     // if not null and can find trashbins
     // save keys
     var keys = Object.keys(childData);
     var data = [];
     var datasize = 0;

     // save at data
     keys.forEach(function(key){
       // only amount more than 80
      if(childData[key].amount>=80){
        var title = childData[key].title;
        var Lat = childData[key].lat;
        var Long = childData[key].long;

        data.push({name: title, lat: Lat, long: Long});
        // check data size
        datasize=datasize+1;
      }

     });
     //console.log('here!!!');
     //console.log(startX);
     //console.log(startY);

     // render request page with data datasize start point information
    res.render('index', { title:'index', row: data, datasize, sX: startX, sY: startY});
  });
});

/* get from home /index */
router.get('/index', function(req, res, next) {
  // get all trashbins from database
  firebase.database().ref('trashBins/').once('value', function(snapshot) {
    var childData = snapshot.val();
     //console.log(childData);
     var keys = Object.keys(childData);
     var data = [];
     var datasize = 0;

     // save at data
     keys.forEach(function(key){
       var title = childData[key].title;
       var Lat = childData[key].lat;
       var Long = childData[key].long;

       data.push({name: title, lat: Lat, long: Long});
       //check data size
       datasize=datasize+1;
     });
     // render request page
    res.render('index', { title:'index', row: data, datasize});
  }); 
});

module.exports = router;
