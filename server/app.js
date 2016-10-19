var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var secret = 'secretword';
var jwt = require('jsonwebtoken');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../client-angular', 'public', 'images', 'favicon.ico')));
// app.use(favicon(path.join(__dirname, '../client-react', 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client-angular', 'public')));
// app.use(express.static(path.join(__dirname, '../client-react', 'public')));

/*================================= token check ================================*/
app.use(function(req, res, next) {
	if ( req.path === '/default' || req.path === '/' || req.path === '/signup' || req.path === '/login' || ( req.path === '/countries' && req.method === 'GET' )) { next(); return; };
	var token = req.body.token || req.query.token || req.headers['authorization'];
	if (token) {
		jwt.verify(token, secret, function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).json({ success: false, message: 'No token provided.' });
	}
});

app.use('/', require('./routes'));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
