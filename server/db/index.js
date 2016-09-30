var MongoClient = require('mongodb').MongoClient,
	mongoose = require('mongoose'),
	assert = require('assert');

var mongo = mongoose.connect('mongodb://localhost:27017/countries-cities-server');

mongo.on("error", console.error.bind(console, "connection error:"));
mongo.once("open", function callback () {
    console.log("Connected to server!")
	mongoose.connection.db['countries-cities-server'](function (err, names) {
		console.log(names);
		module.exports.Collection = names;
	});
});

var dataSchema = new mongoose.Schema({
	id: String,
	cities: Array
});

var Country = mongo.model('Country', dataSchema, { collection: 'countries-cities-server' });


var mongoose = require('mongoose');

if (mongoose.connection.readyState = 0 ) {
mongoose.connect("mongodb://austin:password1@paulo.mongohq.com:10023/test1");
console.log('mongoose readyState is ' + mongoose.connection.readyState);
}
var collection;

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
});

//trying to get collection names
mongoose.connection.db.collectionNames(function (err, names) {
    console.log(names); // [{ name: 'dbname.myCollection' }]
    module.exports.Collection = names;
});



var db = {};

db.get = function (collect, item, callback) {
	Country.find(item, callback);
	MongoClient.connect('mongodb://localhost:27017/countries-cities-server', function(err, db) {
		assert.equal(null, err);
		var collection = db.collection(collect);
		collection.find(item || null).toArray(function(err, items) {
			callback(items);
		});
	});
};

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
