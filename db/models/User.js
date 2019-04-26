const mongoose = require('mongoose');

const User = new mongoose.Schema({
	id: {
		type: string,
		required: true,
		index: true,
		unique: true
	},
	name: {
		type: string,
		required: true,
		trim: true
	},
	email: {
		type: string,
		required: true,
		trim: true
	},
	salted_password: {
		type: string,
		required: true
	},
	salt: {
		type: string,
		required: true
	},
	user_type: {
		type: string,
		required: true
	}
	quotes: {
		type: [int]
	},
});

module.exports = mongoose.model('User', User);