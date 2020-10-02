
const app = require('./app')
require('./config')
require('./database')

app.listen(app.get('port'), () => {
	console.log('Server on port', `http://localhost:${app.get('port')}`)
	console.log('Environment:', process.env.NODE_ENV)
})
