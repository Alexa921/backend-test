var productosController = {}

var productosModel = require('../modelos/productosModel.js').productosModel



productosController.Guardar = function(request, response) {
    var post = {
        "nombre": request.body.nombre,
        "codigo": request.body.codigo,
        "precio": request.body.precio,
        "descripcion": request.body.descripcion,
        "foto": request.body.foto,
        "cantidad": request.body.cantidad,
        "categoria": request.body.categoria,
    };

    // Validaciones mejoradas
    if(!post.nombre || post.nombre.trim() === '') {
        return response.json({state: false, mensaje: "El nombre es requerido"});
    }

    if(post.nombre.length > 100) {
        return response.json({state: false, mensaje: "El nombre no debe exceder los 100 caracteres"});
    }

    if(!post.codigo) {
        return response.json({state: false, mensaje: "El código es requerido"});
    }

    if(post.precio > 1000000) {
        return response.json({state: false, mensaje: "El precio no puede exceder 1,000,000"});
    }

    if(!post.descripcion || post.descripcion.length < 10) {
        return response.json({state: false, mensaje: "La descripción debe tener al menos 10 caracteres"});
    }

    if(!post.foto) {
        return response.json({state: false, mensaje: "La foto es requerida"});
    }

    if(!post.categoria) {
        return response.json({state: false, mensaje: "La categoria es requerida"});
    }


    

    productosModel.Existe(post, function(existe) {
        if(existe.length > 0) {
            return response.json({state: false, mensaje: "El código del producto ya existe intente con otro"});
        }
        
        productosModel.Guardar(post, function(data) {
          
            if(data.state) {
                return response.json({state: true, mensaje: "El producto se ha agregado correctamente"});
            } else {
                return response.json({state: false, mensaje: "Error al guardar el producto"});
            }
        });
    });
};

productosController.ListarTodos = function (request, response) {
    productosModel.ListarTodos({}, function (err, usuarios) {
      if (err) {
        return response.json({ error: err.message });
      }
      return response.json(usuarios);
    });
  };

productosController.ListarId =  function(request, response) {
    var post = {
        id:request.body.id
    }

    if(!post.id) {
        return response.json({state: false, mensaje: "El id es requerido"});
    }

    productosModel.ListarId(post, function(res){
        response.json(res)
    })

};

productosController.Actualizar = function(request, response) {
        var post = {
            "nombre": request.body.nombre,
            "id": request.body.id,
            "precio": request.body.precio,
            "descripcion": request.body.descripcion,
            "foto": request.body.foto,
            "cantidad": request.body.cantidad,
            "categoria": request.body.categoria
        };
    
       
        if(!post.id) {
            return response.json({state:false, mensaje:"El id es requerido"});
        }
    
        if(!post.nombre) {
            return response.json({state:false, mensaje:"El nombre es requerido"});
        }

        if(!post.precio) {
            return response.json({state: false, mensaje: "El precio es requerido"});
        }
        
        if(!post.descripcion){
            return response.json({state: false, mensaje: "La descripción es requerida"});
        }
        
        if(!post.foto){
            return response.json({state: false, mensaje: "La foto es requerida"});
        }
    
        if(!post.cantidad) {
            return response.json({state: false, mensaje: "La cantidad es requerida"});
        }
    
        if(!post.categoria) {
            return response.json({state: false, mensaje: "La categoria es requerida"});
        }
    
    
        productosModel.Existe(post, function(existe) {
            if(existe.length == 0) {
                return response.json({state:false, mensaje:"No podemos actualizar un id porque no existe"});
            }
    
            productosModel.Actualizar(post, function(data) {
                if(data.state == true) {
                    return response.json({state:true, mensaje:"Producto actualizado con exito"});
                } else {
                    return response.json({state:false, mensaje:"Error al actualizar el producto", error: data.error});
                }
            });
        });
};

productosController.Borrar = function(request, response){    

    var post = {
        "id": request.query.id || request.body.id,
    }

    if(!post.id){
        return response.json({state:false, mensaje:"El id es requerido"});
    }

    productosModel.Existe(post, function(existe){
        if(!existe || existe.length == 0){
           return response.json({state:false, mensaje:"No podemos borrar un id que no existe"});
        } else {
            productosModel.Borrar(post, function(data){
                if(data.state){
                    return response.json({state:true, mensaje:"Producto borrado con exito"});
                } else {
                    return response.json({state:false, mensaje:"Error al borrar el producto"});
                }
            });
        }
    });
}

module.exports.productosController = productosController