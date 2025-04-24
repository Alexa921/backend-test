app.post('/ola', (req, res) => { res.send("Hola Mundo!") })

//module.exports = function (app) {
  // Controladores
  const productosController = require("./api/controladores/productosController.js").productosController;
  const usuariosController = require("./api/controladores/usuariosController.js").usuariosController;
  const serviciosController = require("./api/controladores/serviciosController.js").serviciosController;

  // ===============================
  // RUTAS DE PRODUCTOS (por ID)
  // ===============================

  // Crear un producto
  app.post("/productos/guardar", productosController.Guardar);

  // Actualizar un producto por ID
  app.put("/productos/actualizar/:id", productosController.Actualizar);

  // Borrar un producto por ID
  app.delete("/productos/borrar/:id", productosController.Borrar);

  // Listar todos los productos
  app.get("/productos/listarTodos", productosController.ListarTodos);

  // Obtener un producto por ID
  app.post("/productos/listarId", productosController.ListarId);

  // ===============================
  // RUTAS DE USUARIOS
  // ===============================

  // Registrar usuario
  app.post("/usuarios/registrar", (req, res) => {
    usuariosController.Registrar(req, res);
  });

  // Actualizar usuario
  app.put("/usuarios/actualizar", (req, res) => { // Cambio de POST a PUT
    usuariosController.Actualizar(req, res);
  });

  // Borrar usuario
  app.delete("/usuarios/borrar", (req, res) => { // Cambio de POST a DELETE
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
  app.post("/usuarios/login", function (req, res) {
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

  // ===============================
  // RUTAS DE SERVICIOS 
  // ===============================

  // Crear un servicio
  app.post("/servicios/guardar", serviciosController.Guardar);

  // Actualizar un servicio
  app.put("/servicios/actualizar/:id", serviciosController.Actualizar);

  // Borrar un servicio
  app.delete("/servicios/borrar/:id", serviciosController.Borrar);

  // Listar todos los servicios
  app.get("/servicios/listarTodos", serviciosController.ListarTodos);

  // Obtener un servicio
  app.get("/servicios/listarId/:id", serviciosController.ListarId);



