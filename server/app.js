import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routers from './routes';

import expressJwt from 'express-jwt';

const secret = 'SecretWord';
const time = 86000;

const app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

// uncomment after placing your favicon in /public
app.use( favicon( path.join( __dirname, '../client-angular', 'public', 'images', 'favicon.ico' ) ) );
// app.use( favicon( path.join( __dirname, '../client-react', 'public', 'images', 'favicon.ico' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, '../client-angular', 'public' ) ) );
// app.use( express.static( path.join( __dirname, '../client-react', 'public' ) ) );

/*================================= token check ================================*/
app.use( expressJwt({
		secret
	}).unless( ( req ) => {
		return (
			req.path === '/' 
			|| req.path === '/default'
			|| req.path === '/signup' 
			|| req.path === '/login' 
			|| req.path === '/countries' && req.method === 'GET'
		);
	})
)

app.use('/', routers );

// error handlers

// development error handler
// will print stacktrace
if ( app.get('env') === 'development' ) {
	app.use( ( err, req, res, next ) => {
		res.status( err.status || 500 );
		res.render( 'error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use( ( err, req, res, next ) => {
	res.status( err.status || 500 );
	res.render( 'error', {
		message: err.message,
		error: {}
	});
});

export default app;
