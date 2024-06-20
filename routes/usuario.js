//Rutas Usuario
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//api usuarios
// router.post('/',  usuarioController.createUsuario);
router.post('/valida_credenciales', usuarioController.validaCredenciales);
router.post('/recupera_contrasena', usuarioController.recuperaContrasena);
/* router.put('/:id', usuarioController.updateUsuario);
router.get('/:id', usuarioController.getUsuarioId);
router.delete('/:id', usuarioController.deleteUsuario); */


//Estados
module.exports = router;