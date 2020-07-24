'use strict'
// const { checkTokenEmail, checkToken } = require('../middlewares/authenticated');

const express = require('express')
const router = express.Router()
/*
* Importacion de middlewares
*/
const { validate, cleanHTML } = require('../middlewares/validator')
/*
* Importacion de controladores:
*/
const { event_create_get,
		event_create_post,
		list_all_events,
		list_public_events,
		list_private_events,
		list_all_next_events
	} = require('../controllers/events')


/*
* Rutas para el formulario "Crear Evento"
*/
router.get('/events/create', event_create_get)
router.post('/events/create', validate, event_create_post)

/*
* Ruta para listar todos los eventos
*/
router.get('/events', list_all_events);
router.get('/events/public', list_public_events);
router.get('/events/private', list_private_events);
router.get('/events/next', list_all_next_events);


// router.get('/', login);
// router.get('/register', register);

module.exports = router
