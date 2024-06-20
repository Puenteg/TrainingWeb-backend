//Rutas Rutinas
const express = require('express');
const router = express.Router();
const rutinasController = require('../controllers/rutinasController');

//api Rutinas
router.post('/', rutinasController.createRutina);
router.get('/', rutinasController.getRutina);
router.get('/:id', rutinasController.getRutinaId);


//Estados
module.exports = router;