var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  const tb = [
    {title: 'bin1', location: '중랑구'},
    {title: 'bin2', location: '중구'},
    {title: 'bin3', location: '동대문구'}
  ]
  res.send({ trashbins: tb })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'Error'));
});

module.exports = router;
