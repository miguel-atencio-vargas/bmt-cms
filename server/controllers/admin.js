'use strict';
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const passport = require('passport');

const Admin = require('../models/admin');

require('../config');

const adminCtrl = {};


adminCtrl.get_register_form = (req, res, next)  => {
	res.render('register', {
		title: 'Registrar Administrador'
	});
}


adminCtrl.register_form = async (req, res, next) => {
	try {
		const { body } = req;
		body['telegram_notify'] = true;
		//create admin
		const newAdmin = new Admin(body);
		newAdmin.password = await newAdmin.encryptPassword(body.password);
		await newAdmin.save();
		res.json({ //TODO: ir a una pagina de perfil
			ok: true,
			message: "Nuevo Administrador creado!"
		});
	} catch (error) {
		return next(error);
	}
}

adminCtrl.get_login_form = (req, res, next) => {
	res.render('login', {
		title: 'Inicie Sesión como Administrador'
	})
}


// Abcdafds54353@
adminCtrl.login_form = passport.authenticate('local', {
	successRedirect: '/events',
	failureRedirect: '/login',
	failureFlash: true
});

adminCtrl.logout = (req, res) => {
	req.logout();
	req.flash('success_msg', 'Ha cerrado sesion.');
	res.redirect('login');
};


module.exports = adminCtrl;
