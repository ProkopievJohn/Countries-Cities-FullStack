var mongoose = require('mongoose'),
	assert = require('assert'),
	Country = require('./Country.modal');

mongoose.connect('mongodb://localhost:27017/countries-cities-server');

var MongoClient = require('mongodb').MongoClient;
var db = {};

db.get = function (id, callback) {
	Country.findOne(id, function(err, data) {
		assert.equal(null, err);
		callback(data);
	});
};

db.getAll = function (callback) {
	Country.find({}, function (err, data) {
		assert.equal(null, err);
		callback(data);
	});
};

db.add = function (item, callback) {
	var newCountry = new Country(item);
	newCountry.save(function (err, data) {
		assert.equal(null, err);
		Country.find({}, function (err, data) {
			assert.equal(null, err);
			callback(data);
		});
	});
};

db.update = function (id, data, callback) {
	Country.update(
		id,
		{ $addToSet: { cities: { $each: data } } },
		function (err, data) {
			assert.equal(null, err);
			Country.find({}, function (err, items) {
				callback(items);
			})
		}
	)
};

db.removeCity = function (id, data, callback) {
	Country.update(
		id,
		{ $pull: { cities: { $in: data } } },
		function (err, data) {
			assert.equal(null, err);
			Country.find({}, function (err, items) {
				callback(items);
			})
		}
	)
};

db.removeCountryy = function (id, callback) {

	Country.remove(id, function (err, data) {
		assert.equal(null, err);
		Country.find({}, function (err, data) {
			assert.equal(null, err);
			callback(data);
		});
	});
};

db.default = function (callback) {
	var countriesDefault = {
		'Canada'		:["Toronto", "Montreal", "Vancouver", "Lachine", "Mississauga", "Leamington", "Camrose", "Richmond"],
		'Denmark'		:["Copenhagen", "Frederiksberg", "Bronshoj", "Albertslund", "HillerÃ¸d", "FrederiksvÃ¦rk", "Vasby"],
		'Iceland'		:["Reykjavik", "Selfoss", "Grindavik", "KeflavÃ­k", "Dalvik", "Akureyri", "Hvammstangi", "Husavik"],
		'Norway'		:["Jar", "Karlshus", "Moss", "Oslo", "Frogner", "Drammen", "Vestby", "Aursmoen", "Tranby", "Bergen"],
		'United States'	:["Mukilteo", "Fairfield", "Chicago", "Hernando", "Irving", "Baltimore", "Kingston", "Burlington"]
	}
	var items = [];
	for (var i in countriesDefault) {
		items.push({id: i, cities: countriesDefault[i]});
	}
	
	Country.remove({}, function (err, data) {
		assert.equal(null, err);
		Country.create(items, function (err, data) {
			assert.equal(null, err);
			Country.find({}, function (err, data) {
				assert.equal(null, err);
				callback(data);
			});
		});
	});

};

module.exports = db;
