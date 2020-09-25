'use strict'
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')
const { Schema } = mongoose


let AdminSchema = Schema({
	email: {
		type: String,
		unique: true,
		required: [true, 'El email es necesario para crear la cuenta de administrador']
	},
	password: {
		type: String,
		required: [true, 'Es necesario una password']
	},
	subscription: {
		type: Date,
		default: new Date()
	},
	telegram_notify:{
		type: Boolean,
		default: false,
		required: [true, 'Es necesario notificar a Telegram']
	}
})


AdminSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(11)
	return await bcrypt.hash(password, salt)
}

//metodo para borrar el atributo password
AdminSchema.methods.toJSON = function () {
	let admin = this
	let adminObject = admin.toObject()
	delete adminObject.password
	return adminObject
}
//error cuando los datos tienen que ser unicos
AdminSchema.plugin(uniqueValidator, {
	message: 'debe de ser único'
})
module.exports = mongoose.model('Admin', AdminSchema)
