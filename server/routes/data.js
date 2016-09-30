var express = require('express'),
	db = require('../db');

var router = express.Router();

router.get('/', function(req, res){
  db.get('countries-cities-server', null, function(data) {
    res.send(JSON.stringify(data));
  });
});

module.exports = router;
