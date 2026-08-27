const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PUERTO || 3111;
//body-parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//ENDPOINT JSON
app.post("/datosjson", (req,res)=>{
    const datosRecibidos = req.body
    //validamos si los datos son recibidos
    if (datosRecibidos){
        res.status(200).json({mensaje:"datos recibidos correctamente"})

    }
    res.status(500).json({mensaje:"No se recibieron datos"})
    
})

app.post("/formulario", (req,res)=>{
    const datosRecibidos = req.body
    res.json({datos:datosRecibidos})
})

app.post("/datosjson2", (req,res)=>{
    const datosRecibidos = req.body
    res.json({datos:datosRecibidos})

})

// Modo de escucha del servidor
app.listen(port, () => {
    console.log(`SERVER: http://localhost:${port}`)
})