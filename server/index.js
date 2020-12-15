'use strict';
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = require('./app');
require('./database');

app.listen(app.get('port'), () => {
	console.log('Server on', `http://localhost:${app.get('port')}`);
	console.log('Environment:', process.env.NODE_ENV);
})
