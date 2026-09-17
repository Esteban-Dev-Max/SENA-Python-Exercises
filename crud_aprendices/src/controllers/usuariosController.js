const jwtoken = require('jsonwebtoken');
const { autenticarUsuario } = require('../models/usuariosModel');

//endpoint de inicio de sesion para generar el token
const iniciarSesion = (req, res) => {
    const { usuario, clave } = req.body;
    //validar las credenciales del usuario
    if (!autenticarUsuario(usuario, clave)) {
        return res.json({ mensaje: 'Usuario y/o clave incorrectos.' });
    }
    //crear el token de acceso
    const token = jwtoken.sign(
        { user: usuario },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ token });
};

//endpoint de ruta protegida
const rutaProtegida = (req, res) => {
    res.json({ mensaje: 'Este es una ruta protegida' });
};

module.exports = { iniciarSesion, rutaProtegida };