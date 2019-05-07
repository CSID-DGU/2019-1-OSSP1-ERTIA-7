var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  const tb = [
    {title: '박규빈', location: '중랑구'},
    {title: '강인솔', location: '중구'},
    {title: '차민형', location: '동대문구'}
  ]
  res.send({ trashbins: tb })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'Error'));
});

module.exports = router;
