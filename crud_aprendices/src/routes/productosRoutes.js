const express = require('express');
const multer = require('multer');
const ruta = require('path');

const productosController = require('../controllers/productosController');

const router = express.Router();

//configuracion de almacenamiento con multer para subir los archivos de imagen
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'misImagenes/');
    },
    filename: (req, file, cb) => {
        //extraer la extension y despues guardar
        const extension = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`);
    }
});

const cargar = multer({ storage: almacenamiento });

//rutas del CRUD de aprendices
router.get('/', productosController.obtenerTodos);
router.get('/:dni', productosController.obtenerPorDni);
router.post('/', cargar.single('imagen'), productosController.crear);
router.put('/:dni', productosController.editar);
router.delete('/:dni', productosController.eliminar);

module.exports = router;