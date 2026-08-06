import express from 'express';
const app = express();
const port = 3000;
app.get("/", (_, res) => {
    res.send("Hola , estamos aprendiendo express con la ficha 3407184");
});

app.get("/json", (_, res) => {
    res.json({
        datos_personales: {
            nombre: "Esteban",
            apellido: "Reyes",
            telefonos: ["3006706756"],
        },
        datos_programa: {
            nombre: "ADSO",
            tipo_programa: "Tecnologo",
            ficha: "3407184",
        },
    });
});

app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});
