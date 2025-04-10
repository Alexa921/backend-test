const serviciosController = {};
const serviciosModel = require("../modelos/serviciosModel.js").serviciosModel;
const mongoose = require("mongoose");

// Crear producto
serviciosController.Guardar = function (request, response) {
  const post = {
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

  const categoriasPermitidas = ["home", "servicios", "tendencias", "coleccion"];
  if (!categoriasPermitidas.includes(post.categoria)) {
    return response.json({
      state: false,
      mensaje: `Categoría no válida. Debe ser una de: ${categoriasPermitidas.join(", ")}`,
    });
  }

  serviciosModel.Guardar(post, function (data) {
    if (data.state) {
      return response.json({ state: true, mensaje: "Producto guardado correctamente" });
    } else {
      return response.json({ state: false, mensaje: "Error al guardar el producto" });
    }
  });
};

// Listar todos los productos
serviciosController.ListarTodos = function (request, response) {
  serviciosModel.ListarTodos({}, function (err, productos) {
    if (err) return response.json({ error: err.message });
    return response.json(productos);
  });
};

// Obtener producto por ID
serviciosController.ListarId = function (request, response) {
  const id = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.json({ state: false, mensaje: "ID no válido" });
  }

  serviciosModel.ListarId(id, function (err, producto) {
    if (err || !producto) {
      return response.json({ state: false, mensaje: "Producto no encontrado" });
    }
    response.json({ state: true, producto });
  });
};

// Actualizar producto
serviciosController.Actualizar = function (request, response) {
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

  const categoriasPermitidas = ["home", "servicios", "tendencias", "coleccion"];
  if (!categoriasPermitidas.includes(post.categoria)) {
    return response.json({
      state: false,
      mensaje: `Categoría no válida. Debe ser una de: ${categoriasPermitidas.join(", ")}`,
    });
  }

  serviciosModel.ActualizarPorId(id, post, function (data) {
    if (data.state) {
      return response.json({ state: true, mensaje: "Producto actualizado con éxito" });
    } else {
      return response.json({ state: false, mensaje: "Error al actualizar el producto", error: data.error });
    }
  });
};

// Borrar producto
serviciosController.Borrar = function (request, response) {
  const id = request.params.id || request.body._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.json({ state: false, mensaje: "ID no válido" });
  }

  serviciosModel.BorrarPorId(id, function (data) {
    if (data.state) {
      return response.json({ state: true, mensaje: "Producto borrado con éxito" });
    } else {
      return response.json({ state: false, mensaje: "Error al borrar el producto" });
    }
  });
};

module.exports.serviciosController = serviciosController;
