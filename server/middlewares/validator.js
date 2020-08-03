'use strict'

const { body, check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const Admin = require('../models/admin')
require('../config')
const BMT = process.env.BMT
const EXP = process.env.EXP_TOKEN
const SEED = process.env.SEED

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
exports.check_field = [
	body('*', 'no puede estar vacio').not().isEmpty(),
	function(req, res, next){
		const page = req.originalUrl.replace(/\//g, '')
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render( page, {
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
		if(code !== BMT)
			throw new Error('es incorrecto.')
		else
			return true
	}), function(req, res, next) {
		const page = req.originalUrl.replace(/\//g, '')
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render( page, {
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
		const page = req.originalUrl.replace(/\//g, '')
		const errors  = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render( page, {
				title: 'Revise la contraseña',
				admin: req.body,
				errors
			})
		}else{
			next()
		}
	}
]

exports.check_confirm = [
	check('password').custom((password, { req }) => {
		if(password !== req.body.confirm)
			throw new Error('no coincide con la confirmación de la contraseña.')
		else
			return true
	}), function(req, res, next){
		const page = req.originalUrl.replace(/\//g, '')
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render( page, {
				title: 'Las contraseñas no coinciden',
				admin: req.body,
				errors
			})
		}else{
			next() // ir al controlador.
		}
	}
]


// Login
exports.is_email_in_db = [
	check('email').custom((email, { req }) => {
		Admin.find({ email: email }, 'password email').lean()
		.exec(( err, admin_db ) => {
			if(err) return new Error(err)
			console.log("admin_db:",admin_db);
			if( admin_db.length === 0 ){
				//return Promise.reject('Es incorrecto');
				return new Error('es incorrecto')
			}else{
				req.body['pass_db'] = admin_db[0].password
				return true
			}
		})
	}), function(req, res, next){
		const page = req.originalUrl.replace(/\//g, '')
		const errors = validationResult(req).array()
		console.log(errors);
		if( errors.length !== 0 ){
			res.render( page, {
				title: 'Revise sus credenciales',
				admin: req.body,
				errors
			})
		}else{
			next() // ir al controlador.
		}
	}
]

exports.is_password_correct = [
	check('password').custom((password, { req }) => {
		bcrypt.compare(req.pass_db, password)
		.then(res => {
			if(!res) throw new Error('es incorrecta.')
			else return true
		})
		Admin.find({ email }, 'email password').lean()
		.exec((err, admin_db) => {
			if(err) throw new Error(err)
			if( admin_db.length === 0 ){
				return Promise.reject('El email es incorrecto')
			}else{
				req.body['pass_db'] = admin_db[0].password
				console.log(req.body);
				return true
			}
		})
	}), function(req, res, next){
		const page = req.originalUrl.replace(/\//g, '')
		const errors = validationResult(req).array()
		if( errors.length !== 0 ){
			res.render( page, {
				title: 'Revise sus credenciales',
				admin: req.body,
				errors
			})
		}else{
			next() // ir al controlador.
		}
	}
]






//Se debe reemplazar por un xss decente
//.escape().trim()
// exports.cleanHTML = (req, res, next) => {
//     for( let val in req.body){
//         req.body[val] = req.body[val].replace(/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});/ig, '');
//         // limpia todos los atributos que tenian HTML Entities. Que genero el escape()
//     }
//     next();
// }
