var mongoose = require('mongoose');


var CountrySchema = new mongoose.Schema({
	id: String,
	cities: Array
});

module.exports = mongoose.model('countries-cities-server', CountrySchema);
