var productosModel = {}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productosSchema = new Schema({
    codigo: { type: Number, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    foto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    categoria: {
        type: String,
        required: true,
        enum: ['home', 'productos', 'hombre', 'mujer', 'nino', 'descuentos'],
        default: 'home'
    }
});

const Mymodel = mongoose.model('productos', productosSchema);

productosModel.Guardar = function (post, callback) {
    const instancia = new Mymodel({
        codigo: post.codigo,
        nombre: post.nombre,
        precio: post.precio,
        descripcion: post.descripcion,
        foto: post.foto,
        cantidad: post.cantidad,
        categoria: post.categoria
    });

    instancia.save()
        .then(() => {
            return callback({ state: true });
        })
        .catch((error) => {
            console.error(error); 
            return callback({ state: false, mensaje: 'Error al guardar el producto', error: error });
        });
}

productosModel.ListarTodos = function (filtro, callback) {
    Mymodel.find(filtro || {})
        .then((productos) => callback(null, productos))
        .catch((error) => callback(error));
};

productosModel.ListarId = function (post, callback) {
    Mymodel.find({ _id: post.id }, { codigo: 1, nombre: 1, precio: 1, descripcion: 1, foto: 1, cantidad: 1, categoria: 1 })
        .then((res) => {
            return callback(res)
        }).catch((err) => {
            console.log(err)
            return callback({ error: err })
        })
}

productosModel.Existe = function (post, callback) {
    Mymodel.findOne({ _id: post.id }, {})
        .then((respuesta) => {
            return callback(respuesta ? true : false);
        }).catch((error) => {
            console.log(error);
            return callback({ error: error });
        });
}

productosModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate(
        { _id: post.id },
        {
            nombre: post.nombre, precio: post.precio, descripcion: post.descripcion,
            foto: post.foto, cantidad: post.cantidad, categoria: post.categoria
        },
        { new: true }
    ).then((response) => {
        return callback({ state: true });
    }).catch((error) => {
        return callback({ state: false, error: error });
    });
};

productosModel.Borrar = function (post, callback) {
    Mymodel.findOneAndDelete({ _id: post.id })
        .then((respuesta) => {
            if (respuesta) {
                return callback({ state: true });
            } else {
                return callback({ state: false, mensaje: "Producto no encontrado" });
            }
        }).catch((error) => {
            return callback({ state: false, error: error });
        });
}

module.exports.productosModel = productosModel;
