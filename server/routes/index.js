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
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port	: 3001,
  password : null,
  database : 'countries_cities_database'
});

connection.connect();

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
		const resp = squel.select()
			.from( 'cities' ).from( 'countries' )
			.field( 'countries.country' ).field( 'SUM( population )', 'pop' )
			.where( 'countries.id=cities.country' )
			.group( 'countries.country' )
			.toString();

		connection.query( resp, ( err, rows, fields ) => { res.send( rows ) });
	});

	router.route( '/default' ).get( ( req, res ) => {
		connection.query( squel.delete().from('continents').toString(), ( err, rows, fields ) => {} );
		connection.query( squel.delete().from('countries').toString(), ( err, rows, fields ) => {} );
		connection.query( squel.delete().from('cities').toString(), ( err, rows, fields ) => {} );

		const queryContinents = squel.insert().into('continents').setFieldsRows([
				{ id: 201, continent: 'North America' },
				{ id: 202, continent: 'Europe' }
			]).toString();
		const queryCountries = squel.insert().into('countries').setFieldsRows([
				{ id: 101, country: 'Canada', continent: 201 },
				{ id: 102, country: 'Norway', continent: 202 }
			]).toString();
		const queryCities = squel.insert().into('cities').setFieldsRows([
				{ id: 1, city: 'Toronto', population: 5, country: 101 },
				{ id: 2, city: 'Vancouver', population: 2, country: 101 },
				{ id: 3, city: 'Oslo', population: 1, country: 102 },
				{ id: 4, city: 'Drammen', population: 0, country: 102 }
			]).toString();
		connection.query( queryContinents, ( err, rows, fields ) => {} );
		connection.query( queryCountries, ( err, rows, fields ) => {} );
		connection.query( queryCities, ( err, rows, fields ) => { res.redirect('/') } );
	});

	app.use( '/', router );
}