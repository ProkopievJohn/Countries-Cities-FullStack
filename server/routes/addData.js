var express = require('express'),
	db = require('../db');

var router = express.Router();

router.post('/', function(req, res){
	if (typeof req.body.id !== 'string') {
		res.send('error');
		return;
	};

	var id = {id: req.body.id};

	db.get(id, function (data) {
		!data ? addNewCountry(data) : updateCities(req.body);
	});

	function addNewCountry(data) {
		if (typeof req.body.cities === 'string') {req.body.cities = [req.body.cities]}
		db.add(req.body, function (data) {
			res.send(data)
		});
	}

	function updateCities(data) {
		db.update(id, [data.cities], function (data) {
			res.send(data)
		});
	}
});

module.exports = router;



