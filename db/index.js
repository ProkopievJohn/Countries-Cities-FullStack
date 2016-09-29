var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var db = {};

db.get = function (collect, callback) {
	MongoClient.connect('mongodb://localhost:27017/countries-cities-server', function(err, db) {
		assert.equal(null, err);
		var collection = db.collection(collect);
		collection.find().toArray(function(err, items) {
			callback(items);
		});
	});
};

module.exports = db;
