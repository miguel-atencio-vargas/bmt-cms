'use strict'

const { body, check, validationResult } = require('express-validator');
const Admin = require('../models/admin')
require('../config');
const BMT = process.env.BMT

exports.field_is_empty_event = [
    body('*', 'no puede estar vacio.').not().isEmpty(), function(req, res, next){
		const errors  = validationResult(req).array()
		if( errors.length != 0 ){
			res.render('event_form', {
				title: 'Revise los datos del evento',
				event: req.body,
				date: req.body.date,
				errors
			})
		}
		next()
	}
]
//1. Primero revisar que los campos no esten vacios -true
//2. Revisar que el codigo sea incorrecto - false
//3. Revisar que el correo no este en uso- mongoose
//4. Revisar que la contraseña cumple con los requisitos
//body('password', 'debe tener al menos 8 caracteres').isLength({min: 8}), //debe contener un numero y un caracter
exports.check_field_register = [
	body('*', 'no puede estar vacio').not().isEmpty(), function(req, res, next){
		const errors = validationResult(req).array()
		if( errors.length != 0 ){
			res.render('admin_register_form', {
				title: 'Revise los datos del administrador',
				admin: req.body,
				errors
			})
		}
		next()
	}
]
//  misupertoken
exports.check_code_register = [
	body('code', 'es incorrecto').custom(code => {
		console.log(code, BMT);
		if(code !== BMT){
			throw new Error('es incorrecto.')
		}
		return true
	}),
	function(req, res, next) {
		const errors = validationResult(req).array()
		if( errors.length != 0 ){
			res.render('admin_register_form', {
				title: 'Revise el código',
				admin: req.body,
				errors
			})
		}else{
			next()
		}
	}
]

// exports.check_mail = [
// 	check()
// 	.custom((email, {req}) => {
// 		Admin.find({email: email})
// 		.exec((err, admin) => {
// 			console.log('eror: ',  err);
// 			if(err) {return err}
// 			if(admin.length !== 0){
// 				throw new Error('Este email ya está en uso.')
// 			}else{
// 				return email
// 			}
// 		})
// 	})
// ]

// exports.check_password = [
// 	check('password')
// 	.custom((password, { req }) => {
// 		if(password !== req.body.confirm){
// 			throw new Error('no coinciden.')
// 		}else{
// 			return password
// 		}
// 	})
// ]
//Se debe reemplazar por un xss decente
//.escape().trim()
// exports.cleanHTML = (req, res, next) => {
//     for( let val in req.body){
//         req.body[val] = req.body[val].replace(/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});/ig, '');
//         // limpia todos los atributos que tenian HTML Entities. Que genero el escape()
//     }
//     next();
// }
