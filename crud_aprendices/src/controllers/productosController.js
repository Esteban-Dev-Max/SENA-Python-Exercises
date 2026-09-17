const productosModel = require('../models/productosModel');
const { validarAprendiz } = require('../utileria/validaciones');

//endpoint para obtener todos los aprendices
const obtenerTodos = async (req, res, next) => {
    try {
        const listaAprendices = await productosModel.obtenerTodos();
        res.json(listaAprendices);
    } catch (error) {
        next(error);
    }
};

//endpoint para obtener un aprendiz por su dni
const obtenerPorDni = async (req, res, next) => {
    try {
        const dni = parseInt(req.params.dni);
        const aprendiz = await productosModel.obtenerPorDni(dni);
        if (!aprendiz) {
            return res.status(404).json({ Error: 'Aprendiz no encontrado.' });
        }
        res.json(aprendiz);
    } catch (error) {
        next(error);
    }
};

//endpoint para crear un aprendiz
const crear = async (req, res, next) => {
    try {
        const errores = validarAprendiz(req.body);
        if (errores.length > 0) {
            return res.status(400).json({ Error: 'Datos inválidos.', errores });
        }
        const datosAprendiz = {
            ...req.body,
            imagen: req.file ? `/misImagenes/${req.file.filename}` : 'sin imagen'
        };
        const nuevoAprendiz = await productosModel.crear(datosAprendiz);
        res.json(nuevoAprendiz);
    } catch (error) {
        next(error);
    }
};

//endpoint para editar un aprendiz
const editar = async (req, res, next) => {
    try {
        const dni = parseInt(req.params.dni);
        const errores = validarAprendiz(req.body, false);
        if (errores.length > 0) {
            return res.status(400).json({ Error: 'Datos inválidos.', errores });
        }
        const aprendizEditado = await productosModel.editar(dni, req.body);
        if (!aprendizEditado) {
            return res.status(404).json({ Error: 'Aprendiz no encontrado.' });
        }
        res.json(aprendizEditado);
    } catch (error) {
        next(error);
    }
};

//endpoint para eliminar un aprendiz
const eliminar = async (req, res, next) => {
    try {
        const dni = parseInt(req.params.dni);
        const eliminado = await productosModel.eliminar(dni);
        if (!eliminado) {
            return res.status(404).json({ Error: 'Aprendiz no encontrado.' });
        }
        res.json({ mensaje: `Aprendiz con dni ${dni} eliminado.` });
    } catch (error) {
        next(error);
    }
};

module.exports = { obtenerTodos, obtenerPorDni, crear, editar, eliminar };