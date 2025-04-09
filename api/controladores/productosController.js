var productosController = {};
var productosModel = require("../modelos/productosModel.js").productosModel;

// Crear Producto
productosController.Guardar = function (request, response) {
  var post = {
    titulo: request.body.titulo,
    precio: request.body.precio,
    imagen: request.body.imagen,
    material: request.body.material,
    categoria: request.body.categoria,
  };

  // Validaciones
  if (!post.titulo || post.titulo.trim() === "") {
    return response.json({ state: false, mensaje: "El título es requerido" });
  }

  if (post.titulo.length > 100) {
    return response.json({
      state: false,
      mensaje: "El nombre no debe exceder los 100 caracteres",
    });
  }

  if (!post.precio) {
    return response.json({ state: false, mensaje: "El precio es requerido" });
  }

  if (isNaN(post.precio)) {
    return response.json({
      state: false,
      mensaje: "El precio debe ser un número válido",
    });
  }

  if (!post.imagen) {
    return response.json({ state: false, mensaje: "La imagen es requerida" });
  }

  if (!post.material || post.material.trim() === "") {
    return response.json({
      state: false,
      mensaje: "El material es requerido",
    });
  }

  if (!post.categoria) {
    return response.json({
      state: false,
      mensaje: "La categoría es requerida",
    });
  }

  // Verificar si el producto ya existe
  productosModel.Existe(post, function (existe) {
    if (existe.length > 0) {
      return response.json({
        state: false,
        mensaje: "El título del producto ya existe, intente con otro",
      });
    }

    // Guardar producto
    productosModel.Guardar(post, function (data) {
      if (data.state) {
        return response.json({
          state: true,
          mensaje: "El producto se ha agregado correctamente",
        });
      } else {
        return response.json({
          state: false,
          mensaje: "Error al guardar el producto",
        });
      }
    });
  });
};

// Leer todos los productos

productosController.ListarTodos = function (request, response) {
  productosModel.ListarTodos({}, function (err, productos) {
    if (err) {
      return response.json({ error: err.message });
    }
    return response.json(productos);
  });
};

// Leer un producto por título
productosController.Listartitulo = function (request, response) {
  var post = {
    titulo: request.body.titulo,
  };

  if (!post.titulo) {
    return response.json({
      state: false,
      mensaje: "El título es requerido",
    });
  }

  productosModel.Listartitulo(post, function (res) {
    response.json(res);
  });
};

// Actualizar producto
productosController.Actualizar = function (request, response) {
  var post = {
    titulo: request.body.titulo,
    precio: request.body.precio,
    imagen: request.body.imagen,
    material: request.body.material,
    categoria: request.body.categoria,
  };

  // Validaciones
  if (!post.titulo) {
    return response.json({ state: false, mensaje: "El título es requerido" });
  }

  if (!post.precio) {
    return response.json({ state: false, mensaje: "El precio es requerido" });
  }

  if (!post.imagen) {
    return response.json({ state: false, mensaje: "La imagen es requerida" });
  }

  if (!post.material || post.material.trim() === "") {
    return response.json({
      state: false,
      mensaje: "El material es requerido",
    });
  }

  if (!post.categoria) {
    return response.json({
      state: false,
      mensaje: "La categoría es requerida",
    });
  }

  // Verificar si el producto existe para actualizarlo
  productosModel.Existe(post, function (existe) {
    if (existe.length == 0) {
      return response.json({
        state: false,
        mensaje: "No podemos actualizar un título que no existe",
      });
    }

    // Actualizar producto
    productosModel.Actualizar(post, function (data) {
      if (data.state == true) {
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
  });
};

// Borrar producto
productosController.Borrar = function (request, response) {
  var post = {
    titulo: request.query.titulo || request.body.titulo,
  };

  if (!post.titulo) {
    return response.json({ state: false, mensaje: "El título es requerido" });
  }

  // Verificar si el producto existe antes de borrarlo
  productosModel.Existe(post, function (existe) {
    if (!existe || existe.length == 0) {
      return response.json({
        state: false,
        mensaje: "No podemos borrar un título que no existe",
      });
    } else {
      // Borrar producto
      productosModel.Borrar(post, function (data) {
        if (data.state) {
          return response.json({
            state: true,
            mensaje: "Producto borrado con éxito",
          });
        } else {
          return response.json({
            state: false,
            mensaje: "Error al borrar el producto",
          });
        }
      });
    }
  });
};

module.exports.productosController = productosController;