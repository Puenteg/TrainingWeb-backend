//Rutas
const express = require('express');
const router = express.Router();
const profesionalesController = require('../controllers/profesionalController');

//api
// router.post('/', profesionalesController.createProfesional);
// router.get('/', profesionalesController.getProfesional);
// router.get('/:id', profesionalesController.getProfesionalesId);
router.post('/', profesionalesController.createProfesional);
router.get('/', profesionalesController.getProfesionales);


//Estados
module.exports = router;