'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;


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
//metodo para borrar el atributo password
AdminSchema.methods.toJSON = function () {
    let admin = this;
    let adminObject = admin.toObject();
    delete adminObject.password;
    return adminObject;
}
//error cuando los datos tienen que ser unicos
AdminSchema.plugin(uniqueValidator, {
    message: 'debe de ser único'
});
module.exports = mongoose.model('Admin', AdminSchema);
