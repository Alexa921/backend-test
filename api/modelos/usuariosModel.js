var usuariosModel = {}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var usuarios = [];

let usuariosSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    estado: { type: String, required: true },
    codigo: { type: String, required: true }
});

const Mymodel = mongoose.model('usuarios', usuariosSchema);


usuariosModel.Registrar = function(post, callback) {
    const instancia = new Mymodel
    instancia.nombre = post.nombre;
    instancia.email = post.email;
    instancia.password = post.password;
    instancia.estado = 'Inactivo';
    instancia.codigo = post.codigo; 

    instancia.save().then((respuesta) => {
        return callback({state:true});
    }).catch((error) => {
        return callback({state:false});
    });

}

usuariosModel.ListarTodos = function (filtro, callback) {
    // Si no mandan filtro, usamos {}
    Mymodel.find(filtro || {})
      .then((usuarios) => callback(null, usuarios))
      .catch((error) => callback(error));
};

usuariosModel.ListarUnico = function(post, callback) {
    Mymodel.find({email:post.email},{nombre:1, email:1, estado:1})
    .then((res) => {
        return callback(res)
    }).catch((err) => {
        console.log(err)
        return callback({error:err})
    })

}

usuariosModel.Existe = function(post, callback) {
    Mymodel.findOne({email:post.email},{})
    .then((respuesta) => {
        return callback(respuesta ? true : false);
    }).catch((error) => {
        console.log(error);
        return callback({error:error});
    });
    
}

usuariosModel.Actualizar = function(post, callback) {
        Mymodel.findOneAndUpdate(
            {email: post.email}, 
            {nombre: post.nombre, estado: post.estado}, 
            
            {new: true}
        ).then((response) => {
            return callback({state: true}); 
        }).catch((error) => {
            return callback({state: false, error: error}); 
            });
};

usuariosModel.Borrar = function(post, callback) {
    Mymodel.findOneAndDelete({email:post.email})
    .then((respuesta) => {
        if (respuesta) {
            return callback({ state: true });
        } else {
            return callback({ state: false, mensaje: "Usuario no encontrado" });
        }
    }).catch((error) => {
        return callback({state: false, error:error});
    });
}




usuariosModel.Login = function(post, callback) {
    Mymodel.find({
        email: post.email,
        password: post.password
    }, {
        password: 0
    })
    .then((respuesta) => {
        callback(respuesta);
    })
    .catch((error) => {
        callback({error: error});
    });
}

usuariosModel.Activar = function(post, callback) {
    Mymodel
    .findOneAndUpdate(
        {
            email:post.email, 
            codigo:post.codigo
        }, {
            estado:'Activo'
        }, {
            new:true
        })
    .then((respuesta) => {
        callback(respuesta);
    }).catch((error) => {
        console.error("Error al activar usuario:", error);
        callback({state: false, error: error.message});
    });
}

module.exports.usuariosModel = usuariosModel;