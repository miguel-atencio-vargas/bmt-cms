'use strict';
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const passport = require('passport');

const Admin = require('../models/admin');

require('../config');
const BOT_TKN = process.env.BOT_TKN;
const CHAT_ID = process.env.CHAT_ID;


function get_register_form(req, res, next) {
	res.render('register', {
		title: 'Registrar Administrador'
	});
}


async function register_form(req, res, next) {
	try {
		const { body } = req;
		// TODO: telegram notification (se debe verificar que solo se envie si todo ha ido bien.)
		/*const message = `Se esta creando una cuenta de Administrador con email: ${body.email} a horas: ${new Date()}`
		const response = await fetch(`https://api.telegram.org/bot${BOT_TKN}/sendMessage`, {
			method: 'post',
			body: `chat_id=${CHAT_ID}&text=${message}`,
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		})
		body['telegram_notify'] = response.status===200? true:false*/
		body['telegram_notify'] = true;
		//create admin
		const newAdmin = new Admin(body);
		newAdmin.password = await newAdmin.encryptPassword(body.password)
		await newAdmin.save();
		res.json({ //TODO: ir a una pagina de perfil
			ok: true,
			message: "Nuevo Administrador creado!"
		});
	} catch (error) {
		return next(error);
	}
}

function get_login_form(req, res, next) {
	console.log(req.isAuthenticated());
	res.render('login', {
		title: 'Inicie Sesión como Administrador'
	})
}


// Abcdafds54353@
const login_form = function(req, res, next) {
	passport.authenticate('local', function(err, admin, message) {
		if(err){
			// si hay un error redireccionamos al mismo login embebiendo los errores.
			console.log(err, message);
			res.render('login', {
				title: 'Sucedio un error!',
				message
			});
		}
		if(!admin){
			// si no hay usuario el email o contraseña son incorrectos.
			console.log(message);
			res.render('login', {
				title: 'Revise las credenciales',
				message
			});
		}else{
			// si hay usuario se logueo con los datos correctos, terminar la peticion.
			res.redirect('events');
		}
	})(req, res);
}


module.exports = {
	get_register_form,
	register_form,
	get_login_form,
	login_form
}
