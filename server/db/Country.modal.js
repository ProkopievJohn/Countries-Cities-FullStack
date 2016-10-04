var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Country', new Schema({ 
	id: String,
	cities: Array
}));
