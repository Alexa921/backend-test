var productosModel = {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema de productos
let productosSchema = new Schema({
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
});

// Modelo de productos
const Producto = mongoose.model("productos", productosSchema);

// Guardar un producto
productosModel.Guardar = function (post, callback) {
  const instancia = new Producto(post);

  instancia
    .save()
    .then(() => {
      return callback({ state: true });
    })
    .catch((error) => {
      console.error(error);
      return callback({ state: false });
    });
};

// Listar todos los productos
productosModel.ListarTodos = function (filtro = {}, callback) {
  Producto.find(filtro)
    .then((productos) => callback(null, productos))
    .catch((error) => callback(error));
};

// Listar un producto por título
productosModel.Listartitulo = function (post, callback) {
  Producto.findOne(
    { titulo: post.titulo },
    { imagen: 1, titulo: 1, precio: 1, material: 1, categoria: 1 }
  )
    .then((producto) => callback(producto))
    .catch((error) => {
      console.error(error);
      return callback({ error });
    });
};

// Verificar si un producto existe por título
productosModel.Existe = function (post, callback) {
  Producto.findOne({ titulo: post.titulo })
    .then((producto) => callback(producto ? true : false))
    .catch((error) => {
      console.error(error);
      return callback({ error });
    });
};

// Actualizar un producto por título
productosModel.Actualizar = function (post, callback) {
  Producto.findOneAndUpdate({ titulo: post.titulo }, post, { new: true })
    .then((producto) => {
      if (producto) {
        return callback({ state: true });
      } else {
        return callback({ state: false, mensaje: "Producto no encontrado" });
      }
    })
    .catch((error) => {
      console.error(error);
      return callback({ state: false, error });
    });
};

// Borrar un producto por título
productosModel.Borrar = function (post, callback) {
  Producto.findOneAndDelete({ titulo: post.titulo })
    .then((producto) => {
      if (producto) {
        return callback({ state: true });
      } else {
        return callback({ state: false, mensaje: "Producto no encontrado" });
      }
    })
    .catch((error) => {
      console.error(error);
      return callback({ state: false, error });
    });
};

module.exports.productosModel = productosModel;