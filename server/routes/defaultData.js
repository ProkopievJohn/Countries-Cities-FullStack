var express = require('express'),
	db = require('../db');

var router = express.Router();

router.put('/', function(req, res){
  db.default(function (data) {
  	res.send(data);
  });
});

module.exports = router;
