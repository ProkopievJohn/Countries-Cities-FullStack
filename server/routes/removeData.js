var express = require('express'),
	db = require('../db');

var router = express.Router();

router.post('/', function(req, res){
	var id = {id: req.body.id};
	db.get('countries-cities-server', id, function (data) {
		data.length === 0 ? res.send('data not found') : !req.body.cities ? removeCountry() : removeCity(data);
	});

	function removeCountry() {
		db.remove('countries-cities-server', id, function (data) {
			res.send(data);
		});
	}

	function removeCity(data) {
		db.removeCity('countries-cities-server', id, [req.body.cities], function (data) {
			res.send(data);
		});
	}
});

module.exports = router;



