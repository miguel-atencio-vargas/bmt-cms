'use strict'
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const createError = require('http-errors')
const router = require('./router/routes')
const morgan = require('morgan')


const app = express()

//----------view engine setup-----------//
app.set('views', path.join(__dirname, 'client/views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'client/public')))

//-----------Middlewares----------//;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ----- Morgan ------
app.use(morgan('dev'))
//-----------Rutas--------------//
app.use(router)

app.use((req, res, next) => {
	const error = createError(404)
	next(error)
})

app.use((err, req, res, next) => {
	console.log(`====================${new Date()}=====================`)
	console.log(err.stack)
	res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})


module.exports = app
