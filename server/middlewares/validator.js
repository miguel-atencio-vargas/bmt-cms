'use strict'

const { body, check, validationResult } = require('express-validator')
const Admin = require('../models/admin')
require('../config')
const bmt = process.env.BMT

exports.check_field_event = [
    body('*', 'no puede estar vacio.').not().isEmpty(),
	function(req, res, next){
		const errors  = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render('event_form', {
				title: 'Revise los datos del evento',
				event: req.body,
				date: req.body.date,
				errors
			})
		}else{
			next() // ir al controlador
		}
	}
]
//1. Primero revisar que los campos no esten vacios -true
//2. Revisar que el codigo sea incorrecto - true
//3. Revisar que el correo no este en uso- mongoose
//4. Revisar que la contraseña cumple con los requisitos
//5. Revisar que las contraseñas sean iguales
exports.check_field_register = [
	body('*', 'no puede estar vacio').not().isEmpty(),
	function(req, res, next){
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render('admin_register_form', {
				title: 'Revise los datos del administrador',
				admin: req.body,
				errors
			})
		}else{
			next() // ir al siguiente middleware
		}
	}
]
//  misupertoken
exports.check_code_register = [
	body('code').custom(code => {
		//seria bueno añadir un encriptado al code.
		if(code !== bmt)
			throw new Error('es incorrecto.')
		else
			return true
	}), function(req, res, next) {
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render('admin_register_form', {
				title: 'Revise el código',
				admin: req.body,
				errors
			})
		}else{
			next() // ir al siguiente controlador.
		}
	}
]

exports.check_password_min = [
	body('password', 'no cumple con los requisitos necesarios.')
	.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
	function(req, res, next){
		const errors  = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render('admin_register_form', {
				title: 'Revise la contraseña',
				admin: req.body,
				errors
			})
		}else{
			next()
		}
	}
]

exports.check_match_passwords = [
	check('password').custom((password, { req } ) => {
		if(password !== req.body.confirm)
			throw new Error('no coincide con la confirmación de la contraseña.')
		else
			return true
	}), function(req, res, next){
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render('admin_register_form', {
				title: 'Las contraseñas no coinciden',
				admin: req.body,
				errors
			})
		}else{
			next() // ir al controlador.
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
