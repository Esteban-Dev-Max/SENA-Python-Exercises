//usuario registrado que simula la base de datos de usuarios
const usuariobd = {
    usuario: 'jhonny',
    clave: 'abc123'
};

//autenticar un usuario comparando sus credenciales
const autenticarUsuario = (usuario, clave) => {
    return usuario === usuariobd.usuario && clave === usuariobd.clave;
};

module.exports = { usuariobd, autenticarUsuario };