const express = require('express');

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

const app = express.app(config);