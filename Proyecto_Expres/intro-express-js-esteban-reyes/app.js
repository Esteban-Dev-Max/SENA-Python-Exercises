// Importamos Express usando la sintaxis de ES Modules (import)
import express from 'express';

const app = express();
const port = 3000;

// Definición de la ruta principal
app.get('/', (req, res) => {
  res.send('Hola, estamos aprendiendo express con la ficha 3407184');
});

// Inicialización del servidor HTTP
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});