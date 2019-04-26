const mongoose = require('mongoose');

const Quote = new mongoose.Schema({
	id: {
		type: int,
		required: true,
		index: true,
		unique: true
	},
	author: {
		type: string,
		default: 'Unknown',
		trim: true
	},
	body: {
		type: string,
		required: true,
		trim: true
	},
	date: {
		type: date
	},
	posted_by: {
		type: string
	},
	posted_date: {
		type: date
	},
	collections: {
		type: [string]
	},
	categories: {
		type: [string]
	},
});

module.exports = mongoose.model('Quote', Quote);