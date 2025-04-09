const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  estado: { type: String, required: true },
  codigo: { type: String },
});

const Mymodel = mongoose.model("usuarios", usuariosSchema);

const usuariosModel = {};

// Registrar un nuevo usuario
usuariosModel.Registrar = function (post, callback) {
  const instancia = new Mymodel({
    nombre: post.nombre,
    email: post.email,
    password: post.password,
    estado: "Inactivo",
    codigo: post.codigo,
  });

  instancia
    .save()
    .then(() => callback({ state: true }))
    .catch((error) => callback({ state: false, error: error.message }));
};

// Listar todos los usuarios
usuariosModel.ListarTodos = function (filtro, callback) {
  Mymodel.find( {}, {nombre:1, email:1, estado:1})
    .then((usuarios) => callback(null, usuarios))
    .catch((error) => callback({ state: false, error: error.message }));
};

// Listar un único usuario por su email
usuariosModel.ListarUnico = function (post, callback) {
  Mymodel.findOne({email: post.email }, { nombre: 1, email: 1, estado: 1 })
    .then((usuario) => callback(null, usuario))
    .catch((error) => callback({ state: false, error: error.message }));
};

// Verificar si un usuario existe por email
usuariosModel.Existe = function (post, callback) {
  Mymodel.findOne({ email: post.email })
    .then((usuario) => callback(null, usuario ? true : false))
    .catch((error) => callback({ state: false, error: error.message }));
};

// Actualizar un usuario
usuariosModel.Actualizar = function (post, callback) {const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Registrar un nuevo usuario
usuariosModel.Registrar = function (post, callback) {
  const instancia = new Mymodel({
    nombre: post.nombre,
    email: post.email,
    password: post.password,
    estado: "Inactivo",
    codigo: post.codigo,
  });

  instancia
    .save()
    .then(() => {
      logger.info('Nuevo usuario registrado');
      callback({ state: true });
    })
    .catch((error) => {
      logger.error('Error al registrar usuario:', error);
      callback({ state: false, error: error.message });
    });
};

// Listar todos los usuarios
usuariosModel.ListarTodos = function (filtro, callback) {
  Mymodel.find({}, { nombre: 1, email: 1, estado: 1 })
    .then((usuarios) => {
      logger.info('Usuarios listados');
      callback(null, usuarios);
    })
    .catch((error) => {
      logger.error('Error al listar usuarios:', error);
      callback({ state: false, error: error.message });
    });
};

// Listar un único usuario por su email
usuariosModel.ListarUnico = function (post, callback) {
  Mymodel.findOne({ email: post.email }, { nombre: 1, email: 1, estado: 1 })
    .then((usuario) => {
      logger.info('Usuario listado');
      callback(null, usuario);
    })
    .catch((error) => {
      logger.error('Error al listar usuario:', error);
      callback({ state: false, error: error.message });
    });
};

// Verificar si un usuario existe por email
usuariosModel.Existe = function (post, callback) {
  Mymodel.findOne({ email: post.email })
    .then((usuario) => {
      logger.info('Usuario verificado');
      callback(null, usuario ? true : false);
    })
    .catch((error) => {
      logger.error('Error al verificar usuario:', error);
      callback({ state: false, error: error.message });
    });
};

// Actualizar un usuario
usuariosModel.Actualizar = function (post, callback) {
  Mymodel.findOneAndUpdate(
    { email: post.email },
    { nombre: post.nombre, estado: post.estado },
    { new: true }
  )
    .then((usuario) => {
      logger.info('Usuario actualizado');
      callback(null, { state: true, usuario });
    })
    .catch((error) => {
      logger.error('Error al actualizar usuario:', error);
      callback({ state: false, error: error.message });
    });
};

// Borrar un usuario por email
usuariosModel.Borrar = function (post, callback) {
  Mymodel.findOneAndDelete({ email: post.email })
    .then((usuario) => {
      if (usuario) {
        logger.info('Usuario eliminado');
        callback(null, { state: true });
      } else {
        logger.info('Usuario no encontrado');
        callback({ state: false, mensaje: "Usuario no encontrado" });
      }
    })
    .catch((error) => {
      logger.error('Error al eliminar usuario:', error);
      callback({ state: false, error: error.message });
    });
};

// Login de un usuario
usuariosModel.Login = function (post, callback) {
  Mymodel.findOne({ email: post.email, password: post.password })
    .then((usuario) => {
      if (usuario) {
        logger.info('Usuario logueado');
        callback(null, usuario);
      } else {
        logger.info('Credenciales incorrectas');
        callback({ state: false, mensaje: "Credenciales incorrectas" });
      }
    })
    .catch((error) => {
      logger.error('Error al loguear usuario:', error);
      callback({ state: false, error: error.message });
    });
};

// Activar cuenta de usuario con código de activación
usuariosModel.Activar = function (post, callback) {
  Mymodel.findOneAndUpdate(
    { email: post.email, codigo: post.codigo },
    { estado: "Activo" },
    { new: true }
  )
    .then((usuario) => {
      if (usuario) {
        logger.info('Cuenta activada');
        callback(null, {
          state: true,
          mensaje: "Cuenta activada correctamente",
        });
      } else {
        logger.info('Código de activación incorrecto o vencido');
        callback({
          state: false,
          mensaje: "Código de activación incorrecto o vencido",
        });
      }
    })
    .catch((error) => {
      logger.error('Error al activar usuario:', error);
      callback({ state: false, error: error.message });
    });
};
  Mymodel.findOneAndUpdate(
    { email: post.email },
    { nombre: post.nombre, estado: post.estado },
    { new: true }
  )
    .then((usuario) => callback(null, { state: true, usuario }))
    .catch((error) => callback({ state: false, error: error.message }));
};

// Borrar un usuario por email
usuariosModel.Borrar = function (post, callback) {
  Mymodel.findOneAndDelete({ email: post.email })
    .then((usuario) => {
      if (usuario) {
        callback(null, { state: true });
      } else {
        callback({ state: false, mensaje: "Usuario no encontrado" });
      }
    })
    .catch((error) => callback({ state: false, error: error.message }));
};

// Login de un usuario
usuariosModel.Login = function (post, callback) {
  Mymodel.findOne({ email: post.email, password: post.password })
    .then((usuario) => {
      if (usuario) {
        callback(null, usuario);
      } else {
        callback({ state: false, mensaje: "Credenciales incorrectas" });
      }
    })
    .catch((error) => callback({ state: false, error: error.message }));
};

// Activar cuenta de usuario con código de activación
usuariosModel.Activar = function (post, callback) {
  Mymodel.findOneAndUpdate(
    { email: post.email, codigo: post.codigo },
    { estado: "Activo" },
    { new: true }
  )
    .then((usuario) => {
      if (usuario) {
        callback(null, {
          state: true,
          mensaje: "Cuenta activada correctamente",
        });
      } else {
        callback({
          state: false,
          mensaje: "Código de activación incorrecto o vencido",
        });
      }
    })
    .catch((error) => {
      console.error("Error al activar usuario:", error);
      callback({ state: false, error: error.message });
    });
};

module.exports.usuariosModel = usuariosModel;