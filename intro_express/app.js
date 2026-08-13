const express = require('express');  
const app = express();  
const port = 3000; 

app.use(express.json());

const listaAprendices = [
    { nombre: "Oscar Andrés", edad: 19, correo: "oscar@example.com", imgPerfil: "https://x.com/La_Tmb_/status/1625196711143477256" },
    { nombre: "Juan David", edad: 20, correo: "juan@example.com", imgPerfil: "https://www.amazon.com.mx/Quinten-Massys-duquesa-laminado-pulgadas/dp/B0DQYK4WZ1" },
    { nombre: "Camilo", edad: 21, correo: "camilo@example.com", imgPerfil: "https://unsplash.com/es/s/fotos/gente-fea" }
];

app.get("/", function(req, res) {
    res.send("Hola, estamos aprendiendo express con la ficha 3407184"); 
});  

// Agrega esta ruta para responder a GET /api/aprendices
app.get("/api/aprendices", function(req, res) {
    res.json(listaAprendices);
});

app.get("/api/aprendices/:nombre", function(req, res) {
    const nombreRecibido = req.params.nombre.toLowerCase();

    const datosAprendiz = listaAprendices.filter(aprendiz => 
        aprendiz.nombre.toLowerCase().includes(nombreRecibido)
    );
    if (datosAprendiz.length > 0) {
        res.json({ busqueda: req.params.nombre, resultados: datosAprendiz });
    } else {
        res.status(404).json({ error: "Aprendiz no encontrado" });
    }
});

app.post("/api/aprendices", function(req, res) {
    const { nombre, edad, correo, imgPerfil } = req.body;

    // Validar nombre: mínimo 3 letras
    if (!nombre || nombre.length < 3) {
        return res.status(400).json({ error: "El nombre debe tener mínimo 3 letras" });
    }

    // Validar correo electrónico: debe contener @ y .
    if (!correo || !correo.includes("@") || !correo.includes(".")) {
        return res.status(400).json({ error: "El correo electrónico no es válido" });
    }

    const nuevoAprendiz = { nombre, edad, correo, imgPerfil };
    listaAprendices.push(nuevoAprendiz);
    res.status(201).json({ mensaje: "Aprendiz creado con éxito", Datos: nuevoAprendiz });
});

app.listen(port, function() { 
    console.log(`SERVIDOR: http://localhost:${port}`); 
});