var express = require('express'),
	db = require('../db'),
	User = require('../db/User.modal'),
	jwt = require('jsonwebtoken'),
	secret = 'secretword',
	time = 300;
// var expressJwt = require('express-jwt');

var router = express.Router();

/*token check ==================================================================*/
router.use(function(req, res, next) {
	if ( req.path === '/' || req.path === '/signup' || req.path === '/login' || ( req.path === '/countries' && req.method === 'GET' ) || req.path === '/dafault' ) { next(); return; }
	var token = req.body.token || req.query.token || req.headers['authorization'];
	if (token) {
		jwt.verify(token, secret, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).json({ success: false, message: 'No token provided.' });
	}
});

/*=================temp================*/
router.route('/dafault').get(function (req, res) {
	db.default(function (data) {
		res.send(data);
	});
});

/* with out token =======================================================*/
/*default get post*/
router.route('/').get(function (req, res) {
	res.render('index', { title: 'Countries - Cities APP' });
});

/*log in*/
router.route('/signup')
	.post(function (req, res) {
		console.log(req.body);
		if (!req.body.name || !req.body.password) res.json({ success: false, message: 'error nead name and/or password' });

		var id = { name: req.body.name };

		User.findOne(id, function(err, data) {
			if (err) throw err;
			if (!data) {
				signup();
			} else {
				res.json({ success: false, message: 'this user is found' });
			}
		});

		function signup () {
			var token = jwt.sign(id, secret, { algorithm: 'HS256', expiresIn: time });
			var newUser = new User({
				name: req.body.name,
				password: req.body.password
			});
			newUser.save(function (err, data) {
				if (err) throw err;
				res.json({ success: true, user: data, token: token });
			});
		}
	});

/*sign up*/
router.route('/login')
	.post(function (req, res) {
		if (!req.body.name || !req.body.password) res.json({ success: false, message: 'error nead name and/or password' });
		
		var id = { name: req.body.name };

		User.findOne(id, function (err, data) {
			if (!data) {res.json({ success: false, message: 'Authentication failed. User not found.' }); return;}
			if (data.password !== req.body.password ) {res.json({ success: false, message: 'Authentication failed. Wrong password.' }); return;}
			var token = jwt.sign(id, secret, { algorithm: 'HS256', expiresIn: time });
			res.json({ success: true, user: data, token: token });
		});
	});

/*change countries - cities data ==================================================*/
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
			if (typeof req.body.cities === 'string') {req.body.cities = [req.body.cities]}
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
	});

module.exports = router;
