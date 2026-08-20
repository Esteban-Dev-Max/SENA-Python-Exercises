require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// ruta raiz
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Modo de escucha del servidor
app.listen(port, () => { console.log(`SERVER: http://localhost:${port}`); });