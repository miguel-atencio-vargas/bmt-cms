'use strict'

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
// TODO: Estilizar los mensajes y pagina de error cuando este duplicado la clave o el campo es requerido.

let EventSchema = Schema({
    name:{
        type: String,
        unique: true,
        required: [true, 'El nombre del evento es necesario.'],
		maxlength: 100
    },
    description: String,
    date: {
        type: Date,
        default: new Date(),
        required: [true, 'La fecha del evento es necesaria.']
    },
    time: {
        type: String,
        required: [true, 'La hora del evento es necesaria.'],
		maxlength: 100
    },
    image: {
        type: String,
        required: [false, 'La imagen del evento es necesaria.']
    },
    facebook: {
        type: String,
        required: [true, 'El link al evento es neceario.']
    },
    status: {
        type: String,
        required: [true, 'Es necesario si se va a publicar o no el evento.'],
        default: 'private',
		enum:['public', 'private']
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: [false, 'El id del admin es necesario para crear el evento']
    }
})
//metodo para borrar el atributo password
// EventSchema.methods.toJSON = function () {
//     let event = this;
//     let eventObject = event.toObject();
//     delete eventObject.password;
//     return eventObject;
// }

// Virtual for author's URL
EventSchema
.virtual('url')
.get(function () {
    return '/events/' + this._id;
});
EventSchema.plugin(uniqueValidator, {
    message: '{PATH} del evento debe de ser único'
});
module.exports = mongoose.model('Event', EventSchema);
