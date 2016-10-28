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



	router.route( '/' ).get( ( req, res ) => {
		// models.
		models.Continent.findAll({ where: {} }).then( ( data ) => { res.send( data ) })
	})

	router.route( '/default' ).get( ( req, res ) => {
		// let a = Object.keys( models ).map( ( data ) => {
		// 	models.data.destroy({ where: {} });
		// 	return models.data;
		// })
		// let a;
		models.Continent.create({ continent_id: 101, continent: 'Europe' }).then( ( data ) => { res.send( data ) })
		// res.send( a );
		
	})

	app.use( '/', router );
}
