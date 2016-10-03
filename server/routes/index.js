var express = require('express'),
	db = require('../db');

var router = express.Router();

router.route('/').get(function (req, res) {
	res.render('index', { title: 'Countries - Cities APP' });
});

router.route('/countries')
	.get(function (req, res) {
		db.getAll(function (data) {
			res.send(data);
		});
	})
	.post(function (req, res) {
		var id = { id: req.body.id };

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
			if (!data.cities) {
				db.getAll(function (data) {
					res.send(data);
				});
			} else {
				db.update(id, [data.cities], function (data) {
					res.send(data)
				});
			}
		}
	})
	.delete(function (req, res) {
		var id = { id: req.body.id };
		db.get(id, function (data) {
			!data ? res.send('data not found') : !req.body.cities ? removeCountry(data) : removeCity(data);
		})
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
