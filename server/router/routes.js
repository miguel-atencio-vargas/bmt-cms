'use strict'

const express = require('express')
const router = express.Router()

// Importacion de middlewares
const { check_field_event,
		check_code_register,
		//Admin
		check_field,
		check_password_min,
		check_confirm,
		is_email_in_db
	} = require('../middlewares/validator')

/*-----------------------------------------------------*
========================$EVENTS=========================
*------------------------------------------------------*/
const { event_create_get,
		event_create_post,
		list_all_events,
		list_public_events,
		list_private_events,
		list_all_next_events,
		get_event_to_edit,
		edit_event
	} = require('../controllers/events')

// Rutas para el formulario "Crear Evento"
router.get('/events/create', event_create_get)
router.post('/events/create', check_field_event, event_create_post)

// Ruta para listar todos los eventos
router.get('/events', list_all_events)
router.get('/events/public', list_public_events)
router.get('/events/private', list_private_events)
router.get('/events/next', list_all_next_events)

// Rutas para editar el evento
router.get('/events/edit/:id', get_event_to_edit)
router.post('/events/edit/:id', check_field_event, edit_event)



/*-----------------------------------------------------*
========================$ADMIN=========================
*------------------------------------------------------*/
const {
	get_register_form,
	register_form,
	get_login_form,
	login_form
} = require('../controllers/admin')
//======  Register
router.get('/register', get_register_form)
router.post('/register', check_field, check_code_register, check_password_min, check_confirm, register_form)
//======  Login
router.get('/login', get_login_form)
router.post('/login',
	check_field,
	check_password_min,
	is_email_in_db,
	login_form)

module.exports = router
