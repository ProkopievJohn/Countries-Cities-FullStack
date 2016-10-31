import { Router } from 'express';
// import db from '../db';
// import login from './routes.login';
// import signup from './routes.signup';
// import countries from './routes.countries';

import models from '../models';

const secret = 'SecretWord';
const time = 86000;

const router = Router();

export default ( app ) => {
	// router.route( '/' ).get( ( req, res ) => {
	// 	res.render('index', { title: 'Countries - Cities APP' })
	// })

	// router.route( '/default' ).get( ( req, res ) => {
	// 	db.default( ( data ) => {
	// 		res.send( data )
	// 	})
	// })

	// login( router, secret );
	// signup( router, secret, time );
	// countries( router );


	router.route('/add').post( ( req, res ) => {
			models.Continent.findOrCreate({ 
				where: { continent: req.body.continent }
			}).spread( ( continent ) => {
				return models.Country.findOrCreate({
					where: { country: req.body.country },
					defaults: {
						ContinentId: continent.id
					}
				});
			}).spread( ( country ) => {
				models.CallingCode.findOrCreate({
					where: { calling_code: req.body.calling_code },
					defaults: {
						CountryId: country.id
					}
				});
				return models.City.findOrCreate({
					where: { city: req.body.city },
					defaults: {
						population: req.body.population,
						CountryId: country.id
					}
				});
			}).spread( ( city ) => {
				res.send( city );
			})
		});
	
	router.route( '/get/city' ).get( ( req, res ) => {
			models.City.findAll({ include: [ models.Country ] }).then( ( data ) => {
				res.send( data );
			});
		});
	
	router.route( '/get/country/sum/:id' ).get( ( req, res ) => {
			models.Country.findOne({ where: { country: req.params.id } }).then( ( country ) => {
				return models.City.sum( 'population', { where: { CountryId: country.id } });
			}).then( ( sum ) => {
					res.send({sum});
				})
		});


	app.use( '/', router );
}
