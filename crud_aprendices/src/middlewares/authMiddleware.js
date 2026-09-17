const jwtoken = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    //extraer/capturar el token del header de la peticion
    const token = req.header('autenticacion')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado, no provee token.' });
    }

    //verificacion del token
    jwtoken.verify(token, process.env.JWT_SECRET, (error, usuario) => {
        if (error) {
            return res.status(403).json({ Error: 'Token Invalido' });
        }
        req.usuario = usuario;
        next();
    });
};

module.exports = autenticarToken;