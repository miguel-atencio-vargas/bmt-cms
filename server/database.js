'use strict';
const mongoose = require('mongoose');

const HOST = process.env.MONGODB_HOST;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

const MONGODB_URI = `mongodb://${HOST}/${MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
	.then((db) => console.log('Mongodb is connected to', MONGODB_DATABASE))
	.catch((err) => console.error(err));
