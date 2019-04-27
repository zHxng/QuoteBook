const mongoose = require('mongoose');

const Quote = new mongoose.Schema({
	author: {
		type: string,
		default: 'Unknown',
		index: true,
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
		type: string,
		required: true
	},
	posted_date: {
		type: date,
		required: true
	},
	edited_date: {
		type: date,
		default: null
	},
	collections: {
		type: [string]
	},
	categories: {
		type: [string]
	}
});

module.exports = mongoose.model('Quote', Quote);