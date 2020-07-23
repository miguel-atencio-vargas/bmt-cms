'use strict'

const { body, check } = require('express-validator');

exports.validate = [
    body('*', 'El campo no puede estar vacio').notEmpty().escape().trim()
];

exports.cleanHTML = (req, res, next) => {
    for( let val in req.body){
        req.body[val] = req.body[val].replace(/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});/ig, '');
        // limpia todos los atributos que tenian HTML Entities. Que genero el escape()
    }
    next();
}
