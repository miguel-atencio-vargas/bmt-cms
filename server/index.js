'use strict'

const mongoose = require('mongoose')
const app = require('./app')
// importamos la configuracion
require('./config')
const uriDB = process.env.URL_DB;
const port = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(uriDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`Conexión establecida DB: ${uriDB} :D `);
        app.listen(port, () => {
            console.log(`Server running on: http://localhost:${port}`);
        });
    })
    .catch((e) => {
        console.log('Error al servir la aplicacion: \n', e)
    });
