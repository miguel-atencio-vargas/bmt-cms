'use strict'
const { validationResult } = require('express-validator')
//const async = require('async');

const Event = require('../models/event')

function event_create_get(req, res, next){
    res.render('event_form', {
		title: 'Crear Evento'
	})
}

function event_create_post(req, res, next) {
    const errors  = validationResult(req).array()
	if( errors.length != 0 ){
		res.render('event_form', {
			title: 'Revise los datos del evento',
			event: req.body,
			date: req.body.date,
			errors
		})
		return
	}
	let event= new Event(req.body)
	req.body.date = req.body.date+" GMT-0400"
	event.save((err, event) => {
		if(err){ return next(err) }
		res.render('events', {
			title: 'Evento creado Exitosamente!',
			events: [event] // las vista necesita que sea un vector
		})
	})
}

// Recupera TODOS los eventos
function list_all_events(req, res, next){
	Event.find().sort({'date': -1}).lean()
	.exec((err, events) => {
		if(err){ return next(err) }
		res.render('events', {
			title: 'Todos los eventos',
			events
		})
	})
}

// Recuperra todos los eventos publicos y en forma ascendente.
function list_public_events(req, res, next){
	Event.find({'status': 'public'}).sort({'date': -1}).lean()
	.exec((err, events) => {
		if(err){ return next(err) }
		res.render('events', {
			title: 'Eventos en público',
			events
		})
	})
}

// Muestra todos los eventos privados y en forma ascendente.
function list_private_events(req, res, next){
	Event.find({'status': 'private'}).sort({'date': -1}).lean()
	.exec((err, events) => {
		if(err){ return next(err) }
		res.render('events', {
			title: 'Eventos en privado',
			events
		})
	})
}

function list_all_next_events(req, res, next){
	const today = new Date()// por seguridad ver la forma de como establecer la zona horaria GMT-0400
	Event.find().sort({'date': -1}).lean()
	.exec((err, data) => {
		if(err){ return next(err) }

		let events = [];
		for(let e of data){
			if(e.date >= today) { events.push(e) }
		}
		res.render('events', {
			title: 'Próximos Eventos',
			events
		})
	})
}

/*
* Edicion de Eventos
*/

function get_event_to_edit(req, res, next) {
	const { id } = req.params
	Event.findById(id, (err, event) => {
		if(err){ return next(err) }
		const date = event.date? event.date.toJSON().slice(0,10) : '';
		console.log(event);
		res.render('event_form', {
			title: 'Modo Edición',
			event,
			date
		})
	})
}

function edit_event(req, res, next) {
	const errors  = validationResult(req).array()
	const update = req.body
	if( errors.length != 0 ){
		res.render('event_form', {
			title: 'Revise los datos del evento',
			event: update,
			date: update.date,
			errors
		})
		return
	}
	const { id } = req.params
	req.body.date = new Date(req.body.date+" GMT-0400")
	Event.findByIdAndUpdate(id, update, {new: true}, (err, event_updated) => {
		if(err){ return next(err) }
		res.render('events',{
			title: 'Evento actualizado correctamente!',
			events: [event_updated]
		})
	})
}

module.exports = {
    event_create_get,
    event_create_post,
	list_all_events,
	list_public_events,
	list_private_events,
	list_all_next_events,
	get_event_to_edit,
	edit_event
}









/*Funcion para manejar los errores*/
// let errorMessage = (error, res, status, message) => {
//     return res.status(status).json({
//         ok: false,
//         error,
//         message
//     });
// }

//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
//const _ = require('underscore');
