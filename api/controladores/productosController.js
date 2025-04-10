var productosController = {};
var productosModel = require("../modelos/productosModel.js").productosModel;
const mongoose = require("mongoose");

// Crear Producto
productosController.Guardar = function (request, response) {
  var post = {
    titulo: request.body.titulo,
    precio: request.body.precio,
    imagen: request.body.imagen,
    material: request.body.material,
    categoria: request.body.categoria,
  };

  if (!post.titulo || post.titulo.trim() === "") {
    return response.json({ state: false, mensaje: "El título es requerido" });
  }

  if (post.titulo.length > 100) {
    return response.json({
      state: false,
      mensaje: "El título no debe exceder los 100 caracteres",
    });
  }

  if (!post.precio || isNaN(post.precio)) {
    return response.json({
      state: false,
      mensaje: "El precio es requerido y debe ser un número válido",
    });
  }

  if (!post.imagen) {
    return response.json({ state: false, mensaje: "La imagen es requerida" });
  }

  if (!post.material || post.material.trim() === "") {
    return response.json({ state: false, mensaje: "El material es requerido" });
  }

  if (!post.categoria) {
    return response.json({ state: false, mensaje: "La categoría es requerida" });
  }

  productosModel.Guardar(post, function (data) {
    if (data.state) {
      return response.json({ state: true, mensaje: "Producto guardado correctamente" });
    } else {
      return response.json({ state: false, mensaje: "Error al guardar el producto" });
    }
  });
};

// Listar todos los productos
productosController.ListarTodos = function (request, response) {
  productosModel.ListarTodos({}, function (err, productos) {
    if (err) return response.json({ error: err.message });
    return response.json(productos);
  });
};

// Obtener un producto por ID
productosController.ListarId = function (request, response) {
  const id = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.json({ state: false, mensaje: "ID no válido" });
  }

  productosModel.ListarId(id, function (err, producto) {
    if (err || !producto) {
      return response.json({ state: false, mensaje: "Producto no encontrado" });
    }
    response.json({ state: true, producto });
  });
};

// ✅ Actualizar producto por ID desde params
productosController.Actualizar = function (request, response) {
  const id = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.json({ state: false, mensaje: "ID no válido" });
  }

  const post = {
    titulo: request.body.titulo,
    precio: request.body.precio,
    imagen: request.body.imagen || "default.jpg",
    material: request.body.material,
    categoria: request.body.categoria,
  };

  if (
    !post.titulo ||
    !post.precio ||
    !post.imagen ||
    !post.material ||
    !post.categoria
  ) {
    return response.json({
      state: false,
      mensaje: "Faltan campos obligatorios",
    });
  }

  productosModel.ActualizarPorId(id, post, function (data) {
    if (data.state) {
      return response.json({
        state: true,
        mensaje: "Producto actualizado con éxito",
      });
    } else {
      return response.json({
        state: false,
        mensaje: "Error al actualizar el producto",
        error: data.error,
      });
    }
  });
};


// Borrar producto por ID
productosController.Borrar = function (request, response) {
  const id = request.params.id || request.body._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.json({ state: false, mensaje: "ID no válido" });
  }

  productosModel.BorrarPorId(id, function (data) {
    if (data.state) {
      return response.json({ state: true, mensaje: "Producto borrado con éxito" });
    } else {
      return response.json({ state: false, mensaje: "Error al borrar el producto" });
    }
  });
};

module.exports.productosController = productosController;
