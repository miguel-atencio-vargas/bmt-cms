`use strict`;
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');

const router = require('./router/routes');
require('./modules/passport-auth');
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
// app.use(methodOverride('_method'))
const MongoStore = connectMongo(session);
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(bodyParser.json());// not sure to use


app.use(passport.initialize());
app.use(passport.session());



//-------Rutas---------
app.use(router);

// ---- Static Files
app.use(express.static(path.join(__dirname, 'client/public')));

app.use((req, res, next) => {
    const error = createError(404);
    next(error);
})

app.use((err, req, res, next) => {
    console.log(`=======${new Date()}=======`);
    console.log(err.stack);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
})

module.exports = app;
