var User = require('../db/User.model'),
	jwt = require('jsonwebtoken');

module.exports = function ( router, secret, time ) {
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
		}
	);
};
