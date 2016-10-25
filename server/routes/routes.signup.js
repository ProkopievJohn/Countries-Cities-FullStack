// var User = require('../db/User.model'),
// 	jwt = require('jsonwebtoken');

// module.exports = function ( router, secret, time ) {
// 	router.route('/signup')
// 		.post(function(req, res) {
// 			if ( !req.body.name || !req.body.password ) res.json({ success: false, message: 'Authentication failed. Need name and/or password' });

// 			var id = { name: req.body.name };

// 			User.findOne(id, function(err, data) {
// 				if (err) throw err;
// 				if (!data) {
// 					signup();
// 				} else {
// 					res.json({ success: false, message: 'Authentication failed.' });
// 				}
// 			});

// 			function signup () {
// 				var token = jwt.sign(id, secret, { algorithm: 'HS256', expiresIn: time });
// 				var newUser = new User({
// 					name: req.body.name,
// 					password: req.body.password
// 				});
// 				newUser.save(function (err, data) {
// 					if (err) throw err;
// 					res.json({ success: true, user: data, token: token });
// 				});
// 			}
// 		}
// 	);
// };
