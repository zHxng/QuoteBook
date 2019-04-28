const mongoose = require('mongoose');

const Collection = new mongoose.Schema({
	name: {
		type: string,
		required: true,
		trim: true
	},
	description: {
		type: string,
		default: '',
		trim: true
	},
	created_by: {
		type: string,
		required: true
	},
	created_date: {
		type: date,
		require: true
	},
	quotes: {
		type: [int]
	},
	categories: {
		type: [string]
	}
});

module.exports = mongoose.model('Collection', Collection);