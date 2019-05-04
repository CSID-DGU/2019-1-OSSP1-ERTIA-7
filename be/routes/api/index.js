var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET home page. */
router.use('/user', require('./user'))

router.all('*', function(req, res, next){
  next(createError(404, 'Error'));
});

module.exports = router;
