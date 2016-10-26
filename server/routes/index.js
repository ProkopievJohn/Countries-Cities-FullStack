import { Router } from 'express';
import db from '../db';
import login from './routes.login';
import signup from './routes.signup';
import countries from './routes.countries';

const secret = 'SecretWord';
const time = 86000;

const router = Router();

export default ( app ) => {
	router.route( '/' ).get( ( req, res ) => {
		res.render('index', { title: 'Countries - Cities APP' })
	})

	router.route( '/default' ).get( ( req, res ) => {
		db.default( ( data ) => {
			res.send( data )
		})
	})

	login( router, secret );
	signup( router, secret, time );
	countries( router );

	app.use( '/', router );
}
