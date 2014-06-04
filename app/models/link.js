var mongoose = require('mongoose');

module.exports = mongoose.model('Link', {
	id : String,
	author : String,
	title : String,
	description: String
});