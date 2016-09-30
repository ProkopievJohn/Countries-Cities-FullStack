var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var db = {};

db.add = function (collect, item, callback) {
	MongoClient.connect('mongodb://localhost:27017/countries-cities-server', function(err, db) {
		assert.equal(null, err);
		var collection = db.collection(collect);
		collection.insert(item, function (err, data) {
			collection.find().toArray(function(err, items) {
				callback(items);
			});
		});
	});
};

db.get = function (collect, item, callback) {
	MongoClient.connect('mongodb://localhost:27017/countries-cities-server', function(err, db) {
		assert.equal(null, err);
		var collection = db.collection(collect);
		collection.find(item || null).toArray(function(err, items) {
			callback(items);
		});
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
