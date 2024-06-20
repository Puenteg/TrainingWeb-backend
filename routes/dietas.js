//Rutas
const express = require('express');
const router = express.Router();
const dietasControler = require('../controllers/dietasController');

//api
router.post('/', dietasControler.createDieta)
router.get('/', dietasControler.getDietas)
router.get('/:id', dietasControler.getDietaId)
router.delete('/:id', dietasControler.deleteDietaById)


//Estados
module.exports = router;