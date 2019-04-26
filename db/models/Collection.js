const mongoose = require('mongoose');

const Collection = new mongoose.Schema({
	id: {
		type: int,
		required: true,
		index: true,
		unique: true
	},
	name: {
		type: string,
		trim: true
	},
	description: {
		type: string,
		trim: true
	},
	created_by: {
		type: string
	},
	created_date: {
		type: date
	},
	quotes: {
		type: [int]
	},
	categories: {
		type: [string]
	},
});

module.exports = mongoose.model('Collection', Collection);