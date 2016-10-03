var express = require('express'),
	db = require('../db');

var router = express.Router();

router.post('/', function(req, res){

	var id = {id: req.body.id};
	db.get(id, function (data) {
		!data ? res.send('data not found') : !req.body.cities ? removeCountry(data) : removeCity(data);
	});

	function removeCountry(data) {
		db.removeCountryy(data, function (data) {
			res.send(data);
		});
	}

	function removeCity(data) {
		db.removeCity(id, [req.body.cities], function (data) {
			res.send(data);
		});
	}
});

module.exports = router;



