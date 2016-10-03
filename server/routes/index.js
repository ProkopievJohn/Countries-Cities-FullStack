var express = require('express'),
	db = require('../db'),
	jwt = require('express-jwt');

var router = express.Router();

router.route('/').get(function (req, res) {
	res.render('index', { title: 'Countries - Cities APP' });
});


router.route('/countries')
	.get(function (req, res) {
			db.getAll(function (data) {
				res.send(data);
			});
		}
	)
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
/*******************************************************************************************************************************/
var mongoose = require('mongoose'),
	User = require('../db/User.modal');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = 'secret';

router.route('/user')
	.post(function (req, res) {
		if (!req.body.name || !req.body.password) {
			res.send('error nead name and password')
		}
		var token = jwt.sign({name: req.body.name}, secret);
		var nick = new User({
			name: req.body.name,
			password: req.body.password,
			admin: false,
			token: token
		});
		nick.save(function (err, data) {
			if (err) throw err;
			res.send(data.token);
			// res.json({ success: true });
		});
	})
	.get(function (req, res) {
		User.find({}, function (err, data) {
			res.send(data);
		});
	});


router.route('/authenticate').post(function(req, res) {
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {
				var token = jwt.sign(user, 'log');
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

module.exports = router;
