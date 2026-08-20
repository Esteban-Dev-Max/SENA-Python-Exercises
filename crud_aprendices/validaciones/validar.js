// Función para validar que el nombre tenga más de 3 letras
function validarNombre(nombre) {
  if (!nombre || typeof nombre !== 'string') {
    return { valido: false, mensaje: 'El nombre es obligatorio y debe ser un texto.' };
  }
  if (nombre.trim().length <= 3) {
    return { valido: false, mensaje: 'El nombre debe tener más de 3 letras.' };
  }
  return { valido: true };
}

// Función para validar un correo electrónico con expresiones regulares
function validarCorreo(correo) {
  if (!correo || typeof correo !== 'string') {
    return { valido: false, mensaje: 'El correo es obligatorio y debe ser un texto.' };
  }
  const expresionRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!expresionRegular.test(correo)) {
    return { valido: false, mensaje: 'El correo electrónico no es válido.' };
  }
  return { valido: true };
}

module.exports = { validarNombre, validarCorreo };