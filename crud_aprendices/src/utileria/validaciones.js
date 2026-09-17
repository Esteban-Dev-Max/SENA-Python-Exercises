const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//registro de cada peticion y su tiempo de ejecucion
const registroPeticiones = (req, res, next) => {
    const fecha = new Date().toISOString();
    console.log(`[Historial Peticiones] ${fecha}, ${req.method}, ${req.url}, ${req.ip}`);
    const tiempoMilisegundos = Date.now();
    //escuchamos el evento 'fin' para saber cuando termina la respuesta
    res.on('finish', () => {
        const duracion = Date.now() - tiempoMilisegundos;
        console.log(fecha, 'respuesta', res.statusCode, duracion + 'ms');
    });
    next();
};

//validar que el nombre tenga mas de 3 letras
const validarNombre = (nombre) => {
    return typeof nombre === 'string' && nombre.trim().length > 3;
};

//validar un correo valido con expresiones regulares
const validarCorreo = (correo) => {
    return typeof correo === 'string' && expresionCorreo.test(correo);
};

//validar los datos de un aprendiz
//requeridos=true valida nombre y correo obligatorios (crear)
//requeridos=false valida solo los campos presentes (editar)
const validarAprendiz = (datos = {}, requeridos = true) => {
    const errores = [];
    if (requeridos && !validarNombre(datos.nombre)) {
        errores.push('El nombre es requerido y debe tener más de 3 letras.');
    } else if (datos.nombre && !validarNombre(datos.nombre)) {
        errores.push('El nombre debe tener más de 3 letras.');
    }
    if (requeridos && !datos.correo) {
        errores.push('El correo es requerido.');
    } else if (datos.correo && !validarCorreo(datos.correo)) {
        errores.push('El correo no es válido.');
    }
    return errores;
};

module.exports = { registroPeticiones, validarNombre, validarCorreo, validarAprendiz };