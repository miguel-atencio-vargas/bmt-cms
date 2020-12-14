'use strict';

const express = require('express');
const router = express.Router();

// Importacion de middlewares
const { check_field_event, check_code_register,
	check_field, check_email_coincidence,
	check_password_min, check_confirm
} = require('../middlewares/validator');

const { get_register_form, register_form,
	get_login_form, login_form, logout
} = require('../controllers/admin');

const { event_create_get, event_create_post,
	list_all_events, list_public_events,
	list_private_events, list_all_next_events,
	get_event_to_edit, edit_event
} = require('../controllers/events');


const { isAuthenticated } = require("../helpers/auth");

/*-----------------------------------------------------*
========================$EVENTS=========================
*------------------------------------------------------*/
// Rutas para el formulario "Crear Evento"
router.get('/events/create', isAuthenticated, event_create_get);
router.post('/events/create', isAuthenticated, check_field_event, event_create_post);

// Ruta para listar todos los eventos
router.get('/events', isAuthenticated, list_all_events);
router.get('/events/public', isAuthenticated,list_public_events);
router.get('/events/private',isAuthenticated, list_private_events);
router.get('/events/next', isAuthenticated, list_all_next_events);

// Rutas para editar el evento
router.get('/events/edit/:id', isAuthenticated, get_event_to_edit);
router.post('/events/edit/:id', isAuthenticated, check_field_event, edit_event);


/*-----------------------------------------------------*
========================$ADMIN=========================
*------------------------------------------------------*/

//======  Register
router.get('/register', get_register_form);
router.post('/register',
	check_field,
	check_code_register,
	check_email_coincidence,
	check_password_min,
	check_confirm, register_form);

//======  Login
router.get('/login', get_login_form);
router.post('/login', check_field, login_form);
router.get('/logout', logout);
module.exports = router;
