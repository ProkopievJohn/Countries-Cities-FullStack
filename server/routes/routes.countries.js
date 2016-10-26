import db from '../db';

export default ( router ) => {
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
		})
}
