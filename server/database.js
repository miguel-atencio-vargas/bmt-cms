const mongoose = require('mongoose')
require('./config')

const MONGODB_URI = `mongodb://${process.MONGODB_HOST}/${process.MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true})
	.then((db) => console.log('Mongodb is connected to', process.MONGODB_DATABASE, 'database.'))
	.catch((err) => console.error(err))
