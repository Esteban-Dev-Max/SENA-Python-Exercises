const express = require('express');

const { registroPeticiones } = require('./utileria/validaciones');
const manejadorErrores = require('./middlewares/manejadorErrores');
const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

//middlewares globales (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//servir los archivos de imagen subidos
app.use('/misImagenes', express.static('misImagenes'));

//registro del tiempo de ejecucion de cada peticion
app.use(registroPeticiones);

//ruta raiz
app.get('/', (req, res) => {
    res.send('API RESTFUL - CRUD Aprendices');
});

//rutas del modulo
app.use('/api/aprendices', productosRoutes);
app.use('/', usuariosRoutes);

//endpoint para provocar un error
app.get('/error', (req, res, next) => {
    next(new Error('Error provocado'));
});

//manejador de errores
app.use(manejadorErrores);

module.exports = app;