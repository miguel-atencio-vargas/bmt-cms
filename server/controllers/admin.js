'use strict'
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')

const Admin = require('../models/admin')

require('../config')
const BOT_TKN = process.env.BOT_TKN
const CHAT_ID = process.env.CHAT_ID
//const jwt = require('jsonwebtoken');
//const async = require('async');
//const _ = require('underscore');

function get_register_form(req, res, next) {
	res.render('register', {
		title: 'Registrar Administrador'
	})
}

async function register_form(req, res, next) {
	try {
		//password
		const {body} = req
		const plain = body.password
		const saltRounds = 10
		const hash = await bcrypt.hash(plain, saltRounds)
		body.password = hash
		delete body.confirm
		//telegram notification
		const message = `Se esta creando una cuenta de Administrador con email: ${body.email} a horas: ${new Date()}`
		const response = await fetch(`https://api.telegram.org/bot${BOT_TKN}/sendMessage`, {
			method: 'post',
			body: `chat_id=${CHAT_ID}&text=${message}`,
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		})
		body['telegram_notify'] = response.status===200? true:false
		//create admin
		const admin = new Admin(body)
		const new_admin = await admin.save()
		res.json({ // // TODO: ir a una pagina de perfil
			ok: true,
			new_admin
		})
	} catch (error) {
		return next(error)
	}
}

function get_login_form(req, res, next) {
	res.render('login', {
		title: 'Inicie Sesión como Administrador'
	})
}

function login_form(req, res, next) {
	const { body } = req
	Admin.find({'email': body.email}).lean()
	.exec((err, admin) => {
		if(err) { return next(err) }
		console.log(admin)
		res.json({ok: true})
	})
}


module.exports = {
	get_register_form,
	register_form,
	get_login_form,
	login_form
}
