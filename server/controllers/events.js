'use strict'
const {validationResult} = require('express-validator');
const async = require('async');

const Event = require('../models/event');


function event_create_get(req, res, next){
    res.render('event_form', {title_page: 'Crear Evento'});
}

function event_create_post(req, res, next) {
    const errors  = validationResult(req).array()
    let event= new Event()
    event.name 		  = req.body.name
	event.description = req.body.description
	event.date 		  = req.body.date+" GMT-0400"
	event.time 		  = req.body.time
	event.facebook    = req.body.facebook
	event.status      = req.body.status
	if( errors.length != 0 ){
		const date = event.date? event.date.toJSON().slice(0,10) : ''
		res.render('event_form', {title_page: 'Revise los datos del evento', event, date, errors})
		return
	}

	event.save((err, event_saved) => {
		if(err){ return next(err)}
		res.json({
			message: `Nuevo evento: ${event.url}`,
			event_saved
		})
	})
}
function list_all_events(req, res, next){
	Event.find().sort({'date': -1}).lean()
	.exec((err, events) => {
		if(err){ return next(err) }
		res.render('events', {events})
	})
}
// Muestra todos los eventos publicos y en forma ascendente.
function list_public_events(req, res, next){
	Event.find({'status': 'public'}).sort({'date': -1}).lean()
	.exec((err, events) => {
		if(err){ return next(err) }
		res.render('events', {events})
	})
}
// Muestra todos los eventos privados y en forma ascendente.
function list_private_events(req, res, next){
	Event.find({'status': 'private'}).sort({'date': -1}).lean()
	.exec((err, events) => {
		if(err){ return next(err) }
		res.render('events', {events})
	})
}

function list_all_next_events(req, res, next){
	const today = new Date()// por seguridad ver la forma de como establecer la zona horaria GMT-0400
	Event.find().sort({'date': -1}).lean()
	.exec((err, all_events) => {
		if(err){ return next(err) }

		let next_events = [];
		for(let e of all_events){
			if(e.date >= today){
				next_events.push(e)
			}
		}
		console.log(next_events);
		res.render('events', {events: next_events})
	})
}
module.exports = {
    event_create_get,
    event_create_post,
	list_all_events,
	list_public_events,
	list_private_events,
	list_all_next_events
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
