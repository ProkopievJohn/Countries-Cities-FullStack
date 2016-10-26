import User from '../db/User.model';
import jwt from 'jsonwebtoken';

export default ( router, secret ) => {
	router.route( '/login' )
		.post( ( req, res ) => {
			if ( !req.body.name || !req.body.password ) {
				res.json({ success: false, message: 'Authentication failed. Need name and/or password.' })
			}

			const id = { name: req.body.name };

			User.findOne( id, ( err, data ) => {
				if ( !data || data.password !== req.body.password ) {
					res.json({ success: false, message: 'Authentication failed. Need name and/or password.' })
				}
				res.json({ success: true, user: data, token: jwt.sign( id, secret ) })
			})
		})
}
