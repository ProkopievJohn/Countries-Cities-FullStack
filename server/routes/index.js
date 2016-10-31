import { Router } from 'express';
// import db from '../db';
// import login from './routes.login';
// import signup from './routes.signup';
// import countries from './routes.countries';

import squel from 'squel';
import mysql from 'mysql';

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

const squelMysql = squel.useFlavour('mysql');

	router.route( '/default' ).get( ( req, res ) => {
		squel.delete().from('continents').toString();
		squel.delete().from('countries').toString();
		squel.delete().from('cities').toString();
		squel.delete().from('calling_codes').toString();
		squel.insert().into('continents').setFieldsRows([
			{ id: 201, continent: 'North America' },
			{ id: 202, continent: 'Europe' }
			]).toString();
		squel.insert().into('countries').setFieldsRows([
			{ id: 101, country: 'Canada', continent: 201 },
			{ id: 102, country: 'Europe' }
			]).toString();
	})






	app.use( '/', router );
}

