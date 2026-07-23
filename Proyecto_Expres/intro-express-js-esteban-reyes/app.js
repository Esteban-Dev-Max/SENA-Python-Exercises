import express from 'express'
import "dotenv/config"

const app = express();
const port = process.env.port || 3000;

app.get("/", (_, res) => {
  res.send('Hola, estamos aprendiendo express con la ficha 3407184');
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto: ${port}`);
});