const express = require('express');

// configuration for mongodb connection
const config = {
	views: 'views',
	static: 'public',
	db: {
		url: 'mongodb://mongo:27017/quotebookdb',
		type: 'mongo',
		onError: (err) => {
			console.log('Connection with mongodb failed');
		},
		onSuccess: () => {
			console.log('Connection with mongodb successful');
		}
	}
};

// initialize express instance
const app = express.app(config);

// routes 
const Quote = require('./routes/Quote');

app.use(express.json());

// request logger middleware
app.use((req, res, next) => {
	console.log(`${req.method} ${JSON.stringify(req.body)}`);
	next();
});

// set routes
app.use('/quote', Quote);

// throws a 404
app.use((req, res) => {
	res.sendStatus(404);
});

module.exports = app;