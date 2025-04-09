module.exports = function (app) {
    // Controladores
    const productosController =
      require("./api/controladores/productosController.js").productosController;
    const usuariosController =
      require("./api/controladores/usuariosController.js").usuariosController;
  
    // ===============================
    // RUTAS DE PRODUCTOS
    // ===============================
  
    // Crear un producto
    app.post("/productos/guardar", (req, res) => {
      productosController.Guardar(req, res);
    });
  
    // Actualizar un producto
    app.post("/productos/actualizar", (req, res) => {
      productosController.Actualizar(req, res);
    });
  
    // Borrar un producto
    app.post("/productos/borrar", (req, res) => {
      productosController.Borrar(req, res);
    });
  
    // Listar todos los productos
    app.get("/productos/listarTodos", (req, res) => {
      productosController.ListarTodos(req, res);
    });
  
    // Listar productos por título
    app.post("/productos/listartitulo", (req, res) => {
      productosController.Listartitulo(req, res);
    });
  
    // ===============================
    // RUTAS DE USUARIOS
    // ===============================
  
    // Registrar usuario
    app.post("/usuarios/registrar", (req, res) => {
      usuariosController.Registrar(req, res);
    });
  
    // Actualizar usuario
    app.post("/usuarios/actualizar", (req, res) => {
      usuariosController.Actualizar(req, res);
    });
  
    // Borrar usuario
    app.post("/usuarios/borrar", (req, res) => {
      usuariosController.Borrar(req, res);
    });
  
    // Listar todos los usuarios
    app.get("/usuarios/listarTodos", (req, res) => {
      usuariosController.ListarTodos(req, res);
    });
  
    // Listar usuario por email
    app.post("/usuarios/listarUnico", (req, res) => {
      usuariosController.ListarUnico(req, res);
    });
  
    // Login
    app.post("/usuarios/login", (req, res) => {
      usuariosController.Login(req, res);
    });
  
    // Estado del usuario (temporal)
    app.post("/usuarios/state", (req, res) => {
      res.json({ message: "Estado de la solicitud recibido" });
    });
  
    // Activar cuenta por email + código
    app.get("/usuarios/activar/:email/:codigo", (req, res) => {
      usuariosController.Activar(req, res);
    });
  };