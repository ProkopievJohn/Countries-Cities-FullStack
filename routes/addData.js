var express = require('express'),
	db = require('../db');

var router = express.Router();

router.post('/add', function(req, res){
	console.log(req.body);
	res.send('ok');
});

module.exports = router;
