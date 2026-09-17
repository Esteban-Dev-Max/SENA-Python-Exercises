require('dotenv/config');
const app = require('./app');

const port = process.env.PUERTO || 3111;

//modo de escucha del servidor
app.listen(port, () => {
    console.log(`SERVER: http://localhost:${port}`);
});