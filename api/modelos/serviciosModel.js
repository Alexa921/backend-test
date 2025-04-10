const serviciosModel = {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema de servicios
const serviciosSchema = new Schema(
  {
    imagen: { type: String, required: true },
    titulo: { type: String, required: true },
    precio: { type: Number, required: true },
    material: { type: String, required: true },
    categoria: {
      type: String,
      required: true,
      enum: ["home", "servicios", "tendencias", "coleccion"], // OJO: aquí NO está "productos"
      default: "servicios",
    },
  },
  { timestamps: true }
);

const Producto = mongoose.model("servicios", serviciosSchema);

// Guardar un producto
serviciosModel.Guardar = function (post, callback) {
  const instancia = new Producto(post);
  instancia
    .save()
    .then(() => callback({ state: true }))
    .catch((error) => {
      console.error(error);
      return callback({ state: false, error });
    });
};

// Listar todos los productos
serviciosModel.ListarTodos = function (filtro = {}, callback) {
  Producto.find(filtro)
    .then((servicios) => callback(null, servicios))
    .catch((error) => callback(error));
};

// Listar producto por ID
serviciosModel.ListarId = function (id, callback) {
  Producto.findById(id)
    .then((producto) => callback(null, producto))
    .catch((error) => callback(error));
};

// Actualizar producto por ID
serviciosModel.ActualizarPorId = function (id, data, callback) {
  Producto.findByIdAndUpdate(id, data, { new: true })
    .then((producto) => {
      if (producto) {
        callback({ state: true });
      } else {
        callback({ state: false, mensaje: "Servicio no encontrado" });
      }
    })
    .catch((error) => {
      console.error(error);
      callback({ state: false, error });
    });
};

// Borrar producto por ID
serviciosModel.BorrarPorId = function (id, callback) {
  Producto.findByIdAndDelete(id)
    .then((producto) => {
      if (producto) {
        callback({ state: true });
      } else {
        callback({ state: false, mensaje: "Servicio no encontrado" });
      }
    })
    .catch((error) => {
      console.error(error);
      callback({ state: false, error });
    });
};

// Verificar si existe un producto por título
serviciosModel.Existe = function (post, callback) {
  Producto.findOne({ titulo: post.titulo })
    .then((producto) => callback(!!producto))
    .catch((error) => {
      console.error(error);
      callback(false);
    });
};

module.exports.serviciosModel = serviciosModel;
