module.exports = function ( router, db ) {
	router.route('/countries')
		.get(function (req, res) {
			db.getAll(function (data) {
				res.send(data);
			});
		})
		.post(function (req, res) {
			var id = { id: req.body.id };

			db.get(id, function (data) {
				if (data) {res.send('please update'); return;}
				if ( typeof req.body.cities === 'string' && req.body.cities.trim().length > 0 ) {
					req.body.cities = [req.body.cities]
				} else {
					delete req.body.cities;
				}
				db.add(req.body, function (data) {
					res.send(data)
				});
			});
		})
		.put(function (req, res) {
			if (!req.body.cities) {
				db.getAll(function (data) {
					res.send(data);
				});
			} else {
				var id = { id: req.body.id };
			console.log(req.body)
				
				db.update(id, [req.body.cities], function (data) {
					res.send(data)
				});
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
		}
	);
};