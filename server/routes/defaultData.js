var express = require('express'),
	db = require('../db');

var router = express.Router();

router.get('/', function(req, res){
  db.default('countries-cities-server', function (data) {
  	res.send(data);
  });
});

module.exports = router;
