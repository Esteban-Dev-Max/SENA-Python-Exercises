const { leerDatos, guardarDatos } = require('../config/db');

//asignar el siguiente dni disponible (dni automatico)
const asignarDni = (listaAprendices) => {
    if (listaAprendices.length === 0) return 1;
    const dniMayor = listaAprendices.reduce((mayor, aprendiz) => {
        const dni = parseInt(aprendiz.dni);
        return dni > mayor ? dni : mayor;
    }, 0);
    return dniMayor + 1;
};

//listar todos los aprendices
const obtenerTodos = async () => {
    return leerDatos();
};

//obtener un aprendiz por su dni
const obtenerPorDni = async (dni) => {
    const listaAprendices = await leerDatos();
    return listaAprendices.find(aprendiz => parseInt(aprendiz.dni) === dni);
};

//crear un nuevo aprendiz con dni generado automaticamente
const crear = async (datosAprendiz) => {
    const listaAprendices = await leerDatos();
    const nuevoAprendiz = { dni: asignarDni(listaAprendices), ...datosAprendiz };
    listaAprendices.push(nuevoAprendiz);
    await guardarDatos(listaAprendices);
    return nuevoAprendiz;
};

//editar los datos de un aprendiz por dni
const editar = async (dni, datosAprendiz) => {
    const listaAprendices = await leerDatos();
    let aprendizEditado = null;
    const listaActualizada = listaAprendices.map(aprendiz => {
        if (parseInt(aprendiz.dni) === dni) {
            aprendizEditado = { ...aprendiz, ...datosAprendiz };
            return aprendizEditado;
        }
        return aprendiz;
    });
    if (aprendizEditado) {
        await guardarDatos(listaActualizada);
    }
    return aprendizEditado;
};

//eliminar un aprendiz por dni
const eliminar = async (dni) => {
    const listaAprendices = await leerDatos();
    const listaFiltrada = listaAprendices.filter(aprendiz => parseInt(aprendiz.dni) !== dni);
    if (listaFiltrada.length === listaAprendices.length) {
        return false;
    }
    await guardarDatos(listaFiltrada);
    return true;
};

module.exports = { obtenerTodos, obtenerPorDni, crear, editar, eliminar };