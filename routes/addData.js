var express = require('express'),
	db = require('../db');

var router = express.Router();

router.post('/', function(req, res){

	var id = {id: req.body.id};
	db.get('countries-cities-server', id, function (data) {
		data.length === 0 ? addNewCountry(data) : updateCities(req.body);
	});

	function addNewCountry(data) {
		if (req.body.cities) {req.body.cities = [req.body.cities]}
		db.add('countries-cities-server', req.body, function (data) {
			res.send(data)
		});
	}

	function updateCities(data) {
		db.update('countries-cities-server', id, [data.cities], function (data) {
			res.send(data)
		});
	}
});

module.exports = router;



