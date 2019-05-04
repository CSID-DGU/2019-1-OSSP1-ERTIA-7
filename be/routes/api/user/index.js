var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.get('/', function(req, res, next) {
  const us = [
    {
      name: '김',
      age: 14
    },
    {
      name: '이',
      age: 24
    }
  ]
  res.send({ users: us })
});

router.all('*', function(req, res, next) {
  next(createError(404, 'Error'));
});

module.exports = router;
