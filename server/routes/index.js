import { Router } from 'express';
import db from '../db';
import User from '../db/User.model';

import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import jwtCheck from '../jwtCheck';


const router = Router();
const secret = 'SecretWord';
const time = 86000;


/*======================= temp =====================*/
router.route( '/default' )
	.get( ( req, res ) => {
		db.default( ( data ) => {
			res.send( data );
		});
	});

/*======================= start ========================*/
/*default get post*/
router.route('/').get(function (req, res) {
	res.render('index', { title: 'Countries - Cities APP' });
});

/*===================== sign up =================*/
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


/*=================== log in ====================*/
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

/*======= change countries - cities data ========*/
router.route( '/countries' )
	.get( ( req, res ) => {
		db.getAll( ( data ) => {
			res.send(data);
		});
	})
	.post( ( req, res ) => {
		var id = { id: req.body.id };

		db.get( id, ( data ) => {
			if ( data ) {
				return res.send( 'please use update' );
			}
			if ( typeof req.body.cities === 'string' && req.body.cities.trim().length > 0 ) {
				req.body.cities = [ req.body.cities ];
			} else {
				delete req.body.cities;
			}
			db.add( req.body, ( data ) => {
				res.send( data );
			});
		});
	})
	.put( ( req, res ) => {
		if ( !req.body.cities ) {
			db.getAll( ( data ) => {
				res.send( data );
			});
		} else {
			var id = { id: req.body.id };
			db.update( id, [ req.body.cities ], ( data ) => {
				res.send(data)
			});
		}
	})
	.delete( ( req, res ) => {
		var id = { id: req.body.id };
		db.get( id, ( data ) => {
			!data ? res.send( 'data not found' ) : !req.body.cities ? removeCountry( data ) : removeCity( data );
		})
		const removeCountry = ( data ) => {
			db.removeCountryy( data, ( data ) => {
				res.send(data);
			});
		}
		const removeCity = ( data ) => {
			db.removeCity( id, [ req.body.cities ], ( data ) => {
				res.send( data );
			});
		}
	}
)

export default router;
