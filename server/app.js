`use strict`;
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectMongo = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const router = require('./router/routes');
require('./helpers/passport-auth');
require('./config');

const app = express();
app.set('port', process.env.PORT);

//----------view engine setup-----------//
app.set('view engine', 'pug');
//__________vistas------------
app.set('views', path.join(__dirname, 'client/views'));


//-----------Middlewares----------//
// ----- Morgan ------
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());// not sure to use
// app.use(methodOverride('_method'))
const MongoStore = connectMongo(session);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || undefined;
	next();
});

//-------Rutas---------
app.use(router);

// ---- Static Files
app.use(express.static(path.join(__dirname, 'client/public')));

app.use((req, res) => {
	res.render('error');
});

module.exports = app;
