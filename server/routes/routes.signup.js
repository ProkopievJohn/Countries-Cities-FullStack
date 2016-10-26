import User from '../db/User.model';
import jwt from 'jsonwebtoken';

export default ( router, secret, time ) => {
	router.route( '/signup' )
		.post( ( req, res ) => {
			if ( !req.body.name || !req.body.password ) {
				res.json({ success: false, message: 'Authentication failed. Need name and/or password' });
			}

			const id = { name: req.body.name };

			User.findOne( id, ( err, data ) => {
				if (err) throw err;
				if (!data) {
					const newUser = new User({
						name: req.body.name,
						password: req.body.password
					});
					newUser.save( ( err, data ) => {
						if ( err ) throw err;
						res.json({ success: true, user: data, token: jwt.sign( id, secret, { expiresIn: time } ) });
					})
				} else {
					res.json({ success: false, message: 'Authentication failed.' });
				}
			})
		});
}
