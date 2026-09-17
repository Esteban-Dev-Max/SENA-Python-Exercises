const sistemaArchivo = require('fs/promises');
const ruta = require('path');

//ruta hacia el archivo JSON que hace las veces de base de datos
const rutaArchivoJson = ruta.join(__dirname, '..', '..', 'listaDatos.json');

//leer los datos de la "base de datos"
const leerDatos = async () => {
    const datos = await sistemaArchivo.readFile(rutaArchivoJson, 'utf-8');
    return JSON.parse(datos);
};

//guardar los datos en la "base de datos"
const guardarDatos = async (datos) => {
    await sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(datos, null, 2), 'utf-8');
};

module.exports = { rutaArchivoJson, leerDatos, guardarDatos };