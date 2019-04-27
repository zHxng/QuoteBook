const express = require('express');

const router = express.Router();

const Quote = require('../models/Quote');
const documentation = require('./documentation/Quote');

router.get('/', (req, res) => {
	res.status(200).json(documentation);
});

router.post('/', (req, res) => {
	const create = {
		author = req.body.author,
		body = req.body.body,
		date = req.body.date,
		posted_by = req.body.posted_by,
		posted_date = Date.now(),
		edited_date = null,
		collections = req.body.collections,
		categories = req.body.categories
	}

	Quote.create(create)
		.then(quote => {
			// TODO: add quote id to user
			res.status(201).json({
				quote
			});
		})
		.catch(next);
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	Quote.findById(id)
		.then(quote => {
			res.status(200).json({
				quote
			});
		})
		.catch(next);
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	Quote.findByIdAndDelete(id)
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
});

router.get('/:id/:field', (req, res) => {
	const id = req.params.id;
	const field = req.params.field;

	if (field != 'collections' && field != 'categories') {
		res.sendStatus(404);
		return;
	}

	Quote.findById(id)
		.then(quote => {
			res.status(200).json({
				field: JSON.parse(quote).field
			});
		})
		.catch(next);
});

router.put('/:id/:field', (req, res) => {
	const id = req.params.id;
	const field = req.params.field;

	const update;

	if (field == 'body' || field == 'author') {
		update = {
			$set: {
				field: req.body
			},
			$currentDate: {
				edited_date: true
			}
		};
	}
	else if (field == 'collections' || field == 'categories') {
		update = {
			$addToSet: {
				field: req.body
			}
		};
	}
	else {
		res.sendStatus(404);
		return;
	}

	Quote.findByIdAndUpdate(id, update, { new: true })
		.then(quote => {
			res.status(201).json({
				field: JSON.parse(quote).field
			});
		})
		.catch(next);
});

router.delete('/:id/:field', (req, res) => {
	const id = req.params.id;
	const field = req.params.field;

	if (field != 'collections' && field != 'categories') {
		res.sendStatus(404);
		return;
	}

	const update = {
		$pullAll: {
			field: req.body
		}
	};

	Quote.findByIdAndUpdate(id, update)
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
});

router.use((err, req, res, next) => {
	console.error(err);
	res.status(400).json({
		error: err
	});
});

module.exports = router;