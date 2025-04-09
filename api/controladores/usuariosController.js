var nodemailer = require("nodemailer");
var usuariosController = {};
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel;
const crypto = require("crypto-js");
const config = require("../../config.js");

usuariosController.Registrar = function (request, response) {
  console.log("🚀 Llamada a Registrar recibida con los datos:", request.body);
  const post = {
    nombre: request.body.nombre,
    email: request.body.email,
    password: request.body.password,
  };

  // Validaciones
  if (!post.nombre) {
    console.log("❌ Falta completar el nombre");
    return response.json({ state: false, mensaje: "El nombre es requerido" });
  }

  if (!post.email) {
    console.log("❌ Falta completar el email");
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  if (!post.password) {
    console.log("❌ Falta completar el password");
    return response.json({ state: false, mensaje: "El password es requerido" });
  }

  // Hash y datos adicionales
  post.password = crypto.SHA256(post.password + config.secret).toString();
  post.estado = "Inactive";
  post.codigo = "G-" + Math.floor(Math.random() * (99999 - 10000) + 10000);

  console.log("📦 Datos para registrar:", post);

  // Verificar si el usuario ya existe
  usuariosModel.Existe(post, function (err, existe) {
    if (err) {
      console.error("❌ Error verificando existencia:", err);
      return response.json({ state: false, mensaje: "Error interno al verificar el usuario" });
    }

    if (existe) {
      console.log("⚠️ El usuario ya existe");
      return response.json({ state: false, mensaje: "El Email ya existe" });
    }

    usuariosModel.Registrar(post, function (data) {
      console.log("🔍 Resultado de usuariosModel.Registrar:", data);

      if (data.state) {
        console.log("✅ Configuración de correo:", config.email);

        // Configuración y envío de correo de activación
        const transporter = nodemailer.createTransport({
          host: config.email.host,
          port: config.email.port,
          secure: false,
          requireTLS: true,
          auth: {
            user: config.email.user,
            pass: config.email.pass,
          },
        });

        const mailOptions = {
          from: config.email.user,
          to: post.email,
          subject: "Activación de cuenta",
          text: `¡Registro exitoso!\n\nTu código de activación es: ${post.codigo}\nActiva tu cuenta aquí: http://localhost:3001/usuarios/activar/${post.email}/${post.codigo}`,
        };

        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            console.error("❌ Error enviando correo:", error);
            return response.json({
              state: true,
              mensaje: "¡Registro exitoso!, pero hubo un problema enviando el correo.",
            });
          }
          return response.json({
            state: true,
            mensaje: "¡Registro exitoso! Revisa tu correo para activar tu cuenta.",
          });
        });
      } else {
        console.error("❌ Error en usuariosModel.Registrar:", data.error);
        return response.json({
          state: false,
          mensaje: "Error al registrar el usuario",
          error: data.error,
        });
      }
    });
  });
};

usuariosController.ListarTodos = function (request, response) {
  usuariosModel.ListarTodos({}, function (err, usuarios) {
    if (err) {
      return response.json({ error: err.message });
    }
    return response.json(usuarios);
  });
};

usuariosController.ListarUnico = function (request, response) {
  const post = {
    email: request.body.email,
  };

  if (!post.email) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  usuariosModel.ListarUnico(post, function (res) {
    response.json(res);
  });
};

usuariosController.Actualizar = function (request, response) {
  const post = {
    nombre: request.body.nombre,
    email: request.body.email,
    estado: request.body.estado,
    rol: request.body.rol,
  };

  if (!post.nombre) {
    return response.json({ state: false, mensaje: "El nombre es requerido" });
  }

  if (!post.email) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  if (!post.estado) {
    return response.json({ state: false, mensaje: "El estado es requerido" });
  }

  if (!post.rol) {
    return response.json({ state: false, mensaje: "El campo rol es obligatorio" });
  }

  if (["Administrador", "Cliente", "Facturador"].indexOf(post.rol) === -1) {
    return response.json({
      state: false,
      mensaje: "El rol debe ser Administrador, Cliente o Facturador",
    });
  }

  usuariosModel.Existe(post, function (err, existe) {
    if (err || !existe) {
      return response.json({
        state: false,
        mensaje: "No podemos actualizar el usuario porque no existe",
      });
    }

    usuariosModel.Actualizar(post, function (err, data) {
      if (err || !data.state) {
        return response.json({
          state: false,
          mensaje: "Error al actualizar el usuario",
          error: err?.message || data?.error,
        });
      }

      return response.json({
        state: true,
        mensaje: "Usuario actualizado correctamente",
      });
    });
  });
};

usuariosController.Borrar = function (request, response) {
  const post = {
    email: request.query.email || request.body.email,
  };

  if (!post.email) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  usuariosModel.Existe(post, function (err, existe) {
    if (err || !existe) {
      return response.json({
        state: false,
        mensaje: "No podemos borrar un usuario que no existe",
      });
    }

    usuariosModel.Borrar(post, function (err, data) {
      if (err || !data.state) {
        return response.json({
          state: false,
          mensaje: "Error al borrar el usuario",
        });
      }

      return response.json({
        state: true,
        mensaje: "Usuario borrado correctamente",
      });
    });
  });
};

usuariosController.Login = function (request, response) {
  const post = {
    email: request.body.email,
    password: request.body.password,
  };

  if (!post.email) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  if (!post.password) {
    return response.json({ state: false, mensaje: "El password es requerido" });
  }

  post.password = crypto.SHA256(post.password + config.secret).toString();

  usuariosModel.Login(post, function (err, data) {
    if (err || !data || data.length === 0) {
      return response.json({
        state: false,
        mensaje: "Tus credenciales son incorrectas",
      });
    }

    if (data.estado === "Inactive") {
      return response.json({
        state: false,
        mensaje: "Tu cuenta está inactiva, revisa tu correo para activarla",
      });
    }

    return response.json({ mensaje: "Bienvenido " + data.nombre });
  });
};

usuariosController.Activar = function (request, response) {
  const post = {
    email: request.params.email,
    codigo: request.params.codigo,
  };

  if (!post.email?.trim()) {
    return response.json({ state: false, mensaje: "El email es requerido" });
  }

  if (!post.codigo?.trim()) {
    return response.json({ state: false, mensaje: "El código es requerido" });
  }

  usuariosModel.Activar(post, function (data) {
    if (!data || !data.state) {
      return response.json({
        state: false,
        mensaje: "No se puede activar el usuario",
      });
    }

    return response.json({
      state: true,
      mensaje: "Usuario activado correctamente",
    });
  });
};

module.exports.usuariosController = usuariosController;

