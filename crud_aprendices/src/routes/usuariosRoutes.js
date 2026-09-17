const express = require('express');

const usuariosController = require('../controllers/usuariosController');
const autenticarToken = require('../middlewares/authMiddleware');

const router = express.Router();

//endpoint de inicio de sesion para generar el token
router.post('/login', usuariosController.iniciarSesion);

//endpoint con ruta protegida
router.get('/rutaProtegida', autenticarToken, usuariosController.rutaProtegida);

module.exports = router;