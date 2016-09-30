var MongoClient = require('mongodb').MongoClient,
	mongoose = require('mongoose'),
	assert = require('assert');

var mongo = mongoose.connect('mongodb://localhost:27017/countries-cities-server');

var dataSchema = new mongoose.Schema({
	id: String,
	cities: Array
});

// var Country = mongo.model('Country', dataSchema);
var Country = mongo.model('Country', dataSchema, 'countries-cities-server');


var db = {};

db.get = function (collect, item, callback) {
	Country.find(item, function(err, data) {
		if (err) return handleError(err);
		callback(data);
	});
};

db.add = function (collect, item, callback) {
	Country.create(item, function (err, data) {
		if (err) return handleError(err);
		Country.find({}, function(err, data) {
			if (err) return handleError(err);
			callback(data);
		})
	});
};

db.update = function (collect, id, data, callback) {
	MongoClient.connect('mongodb://localhost:27017/countries-cities-server', function(err, db) {
		assert.equal(null, err);
		var collection = db.collection(collect);
		collection.update(
			id,
			{ $addToSet:  { cities: { $each: data } } },
			function (err, data) {
				collection.find().toArray(function(err, items) {
					callback(items);
				});
			}
		);
	});
};

db.removeCity = function (collect, id, data, callback) {
	MongoClient.connect('mongodb://localhost:27017/countries-cities-server', function(err, db) {
		assert.equal(null, err);
		var collection = db.collection(collect);
		collection.update(
			id,
			{ $pull: { cities: { $in: data } } },
			{ multi: true },
			function (err, data) {
				collection.find().toArray(function(err, items) {
					callback(items);
				});
			}
		);
	});
};

db.remove = function (collect, id, callback) {
	MongoClient.connect('mongodb://localhost:27017/countries-cities-server', function(err, db) {
		assert.equal(null, err);
		var collection = db.collection(collect);
		collection.deleteOne(
			id,
			function (err, data) {
				collection.find().toArray(function(err, items) {
					callback(items);
				});
			}
		);
	});
};

db.default = function (collect, callback) {
	MongoClient.connect('mongodb://localhost:27017/countries-cities-server', function(err, db) {
		assert.equal(null, err);

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
		var collection = db.collection(collect);
		collection.remove();
		collection.insert(items, function () {
			collection.find().toArray(function(err, data){
				callback(data);	
			})
		});
	});
};

module.exports = db;
