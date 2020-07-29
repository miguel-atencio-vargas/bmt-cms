/*========================================================
Entorno para saber si estoy en desarrollo o en producción
========================================================*/
process.env.NODE_ENV = 'dev';
/*===========================
----------Puerto-------------
=============================*/
process.env.PORT =  1234;
/*===========================
--------Base de datos--------
//===========================*/
process.env.URL_DB = 'mongodb://localhost:27017/bmt-full-stack';
/*============================
------Vencimiento del token---
==============================*/
process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '48h';
/*===========================
-----SEED de autenticacion---
=============================*/
process.env.SEED = process.env.SEED || 'este_es_el_SEED_de_desarrollo';
/*===========================
-----token para crear administrador---
=============================*/
process.env.BMT = process.env.BMT || 'misupertoken'
