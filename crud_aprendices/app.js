const express = require('express');
const app = express();
require('dotenv').config({ quiet: true });
const port = process.env.PORT || 3000;
//body-parser
app.use(express.json())

//libreria para leer archivo
const sistemaArchivo = require('fs');
const ruta = require('path');
//generar una ruta para el archivo ListaDatos.json
const rutaArchivoJson = ruta.join(__dirname, 'ListaDatos.json');

//importar validaciones
const { validarNombre, validarCorreo } = require('./validaciones/validar');

//ruta raiz
app.get('/', (req, res) => {
    res.send('API RESTFUL - CRUD Aprendices');
});

//endpoint para obtener todos los aprendices
app.get('/api/aprendices', (req, res) => {
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conexión bd" })
        }
        const listaAprendices = JSON.parse(datos);
        res.json(listaAprendices);
    });
});

//endpoint para listar todos los datos de un aprendiz por su dni
app.get('/api/aprendices/:dni', (req, res) => {
    const dni = parseInt(req.params.dni);
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conexión bd" })
        }
        const listaAprendices = JSON.parse(datos);
        const aprendiz = listaAprendices.find(a => a.dni === dni);
        if (!aprendiz) {
            return res.status(404).json({ Error: "No se encontró un aprendiz con ese dni" });
        }
        res.json(aprendiz);
    });
});

//endpoint crear un aprendiz
app.post("/api/aprendices", (req, res) => {
    const datoAprendiz = req.body

    //VALIDACIONES
    const nombreValido = validarNombre(datoAprendiz.nombre);
    if (!nombreValido.valido) {
        return res.status(400).json({ Error: nombreValido.mensaje });
    }

    const correoValido = validarCorreo(datoAprendiz.correo);
    if (!correoValido.valido) {
        return res.status(400).json({ Error: correoValido.mensaje });
    }

    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conexión bd" })
        }
        const listaAprendices = JSON.parse(datos);
        //dni AUTOMÁTICO: se genera a partir del último dni registrado
        const ultimoDni = listaAprendices.length > 0 ? listaAprendices[listaAprendices.length - 1].dni : 0;
        datoAprendiz.dni = ultimoDni + 1;

        //adicionar a la lista el nuevo aprendiz
        listaAprendices.push(datoAprendiz)
        //adicionar al archivo el nuevo aprendiz
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error) => {
            if (error) {
                return res.status(500).json({ Error: "No se puede registrar el aprendiz." })
            }
            res.status(201).json(datoAprendiz)
        })
    })
})

//Endpoint para editar un aprendiz
app.put("/api/aprendices/:dni", (req, res) => {
    const dni = parseInt(req.params.dni)
    const datosAprendiz = req.body
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conexión bd" })
        }
        let listaAprendices = JSON.parse(datos);

        //verificar que el aprendiz exista
        const existe = listaAprendices.some(a => a.dni === dni);
        if (!existe) {
            return res.status(404).json({ Error: "No se encontró un aprendiz con ese dni" });
        }

        //modificar datos de un aprendiz
        listaAprendices = listaAprendices.map(aprendiz => {
            return aprendiz.dni === dni ? { ...aprendiz, ...datosAprendiz } : aprendiz
        })
        //adicionar al archivo el aprendiz modificado
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error) => {
            if (error) {
                return res.status(500).json({ Error: "No se puede registrar el aprendiz." })
            }
            res.json(datosAprendiz)
        })
    })
})

//Endpoint para eliminar un aprendiz
app.delete("/api/aprendices/:dni", (req, res) => {
    const dni = parseInt(req.params.dni);
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: "Error al leer el archivo, conexión bd" })
        }
        let listaAprendices = JSON.parse(datos);

        //verificar que el aprendiz exista
        const aprendizExiste = listaAprendices.some(a => a.dni === dni);
        if (!aprendizExiste) {
            return res.status(404).json({ Error: "No se encontró un aprendiz con ese dni" });
        }

        //eliminar al aprendiz de la lista
        listaAprendices = listaAprendices.filter(a => a.dni !== dni);

        //guardar los cambios en el archivo
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null, 2), (error) => {
            if (error) {
                return res.status(500).json({ Error: "No se puede eliminar el aprendiz." })
            }
            res.json({ Mensaje: "Aprendiz eliminado correctamente" })
        })
    })
})

// Modo de escucha del servidor
app.listen(port, () => {
    console.log(`SERVER: http://localhost:${port}`)
})