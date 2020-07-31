'use strict'
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const FormData = require('form-data')
const { URLSearchParams } = require('url')
//const { Telegraf } = require('telegraf')
//const Telegram = require('telegraf/telegram')

const Admin = require('../models/admin')

require('../config')
const BOT_TOKEN = process.env.BOT_TOKEN
const CHAT_ID = process.env.CHAT_ID
//const jwt = require('jsonwebtoken');
//const async = require('async');
//const _ = require('underscore');

function get_register_form(req, res, next) {
    res.render('admin_register_form', {
		title: 'Registrar Administrador'
	})
}

async function register_form(req, res, next) {
	try{
		const plain = req.body.password
		const saltRounds = 10
		const hash = await bcrypt.hash(plain, saltRounds)
		req.body.password = hash
		const admin = new Admin(req.body)
		const new_admin = await admin.save()
		await sendMessageBot(req.body.email)
		res.json({
			ok: true,
			new_admin
		})
	}catch(error){
		return next(error)
	}
}

async function sendMessageBot(email){
	const data = `chat_id=${CHAT_ID}&text=Se esta creando una cuenta de Administrador con email: ${email} a horas: ${new Date()}`

	fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
		method:'post', 
		body: data,
		headers: {'content-type': 'application/x-www-form-urlencoded'}
	})
	.then(body => {
		console.log(body)
	})
	.catch(err => console.log(err))

}
module.exports = {
    get_register_form,
	register_form
}


// const data = qs.stringify({
// 	'chat_id': CHAT_ID,
// 	'text': 'Por fin se pudo conectar'
// })
// const config = {
// 	method: 'post',
// 	url: `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded'
// 	},
// 	data: data
// }
// console.log("***", config);
// axios(config)
// 	.then(function (response) {
// 		console.log(JSON.stringify(response.data));
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	});