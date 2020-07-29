'use strict'
const { validationResult } = require('express-validator')
const Admin = require('../models/admin')

//const jwt = require('jsonwebtoken');
//const async = require('async');
//const bcrypt = require('bcrypt');
//const _ = require('underscore');




function get_register_form(req, res, next) {
    res.render('admin_register_form', {
		title: 'Registrar Administrador'
	})
}

function register_form(req, res, next) {
	console.log('llege al controller');
	// const errors  = validationResult(req).array()
	// const { code } = req.body
	// if(code != BMT)
	// 	errors.push({
	// 	msg: 'es incorrecto.',
	// 	param: 'código'})
	// if( errors.length != 0 ){
	// 	res.render('admin_register_form', {
	// 		title: 'Revise los datos',
	// 		admin: req.body,
	// 		errors
	// 	})
	// 	return
	// }
	res.json({ok: 'true'})
}

module.exports = {
    get_register_form,
	register_form
}
