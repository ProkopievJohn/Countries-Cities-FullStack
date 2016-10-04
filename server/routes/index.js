var express = require('express'),
	db = require('../db'),
	User = require('../db/User.model'),
	jwt = require('jsonwebtoken'),
	secret = 'secretword',
	time = 300;

var router = express.Router();

/*======================= temp =====================*/
router.route('/default').get(function (req, res) {
	db.default(function (data) {
		res.send(data);
	});
});

/*==================== with out token ======================*/
/*default get post*/
router.route('/').get(function (req, res) {
	res.render('index', { title: 'Countries - Cities APP' });
});

/*===================== sign up =================*/
require('./routes.signup')( router, secret, time );

/*=================== log in =====================*/
require('./routes.login')( router, secret, time );

/*========= change countries - cities data ===========*/
require('./routes.countries')( router, db );

module.exports = router;
