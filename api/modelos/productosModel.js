var productosModel = {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema de productos
let productosSchema = new Schema(
  {
    imagen: { type: String, required: true },
    titulo: { type: String, required: true },
    precio: { type: Number, required: true },
    material: { type: String, required: true },
    categoria: {
      type: String,
      required: true,
      enum: ["home", "productos", "tendencias", "coleccion"],
      default: "productos",
    },
  },
  { timestamps: true }
);

// Modelo de productos
const Producto = mongoose.model("productos", productosSchema);

// Guardar un producto
productosModel.Guardar = function (post, callback) {
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
productosModel.ListarTodos = function (filtro = {}, callback) {
  Producto.find(filtro)
    .then((productos) => callback(null, productos))
    .catch((error) => callback(error));
};

// Listar un producto por ID
productosModel.ListarId = function (id, callback) {
  Producto.findById(id)
    .then((producto) => callback(null, producto))
    .catch((error) => callback(error));
};

// Actualizar un producto por ID
productosModel.ActualizarPorId = function (id, data, callback) {
  Producto.findByIdAndUpdate(id, data, { new: true })
    .then((producto) => {
      if (producto) {
        callback({ state: true });
      } else {
        callback({ state: false, mensaje: "Producto no encontrado" });
      }
    })
    .catch((error) => {
      console.error(error);
      callback({ state: false, error });
    });
};

// Borrar un producto por ID
productosModel.BorrarPorId = function (id, callback) {
  Producto.findByIdAndDelete(id)
    .then((producto) => {
      if (producto) {
        callback({ state: true });
      } else {
        callback({ state: false, mensaje: "Producto no encontrado" });
      }
    })
    .catch((error) => {
      console.error(error);
      callback({ state: false, error });
    });
};

// Verificar si un producto existe por título
productosModel.Existe = function (post, callback) {
  Producto.findOne({ titulo: post.titulo })
    .then((producto) => callback(producto ? true : false))
    .catch((error) => {
      console.error(error);
      callback(false);
    });
};

module.exports.productosModel = productosModel;