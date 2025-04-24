const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { config } = require("./config.js");
global.app = express();

// ✅ Middleware para parsear JSON y datos de formulario

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Configuración de CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || config.listablanca.includes(origin)) {
        return callback(null, true);
      }
      return callback(
        new Error(`Error de CORS: No tiene permiso para ${origin}`)
      );
    },
    credentials: true,
  })
);

// ✅ Importación correcta de r
//app.use("/api", rutas);

// ✅ Conexión a MongoDB con manejo de errores mejorado
mongoose
  .connect(
    "mongodb://" +
      config.bdUser +
      ":" +
      config.bdPass +
      "@" +
      config.bdIp +
      ":" +
      config.bdPort +
      "/" +
      config.bd
  )
  .then((respuesta) => {
    console.log("Conexion correcta a mongo");
  })
  .catch((error) => {
    console.log(error);
  });
   require("./rutas.js");
// ✅ Servir archivos estáticos del frontend
/*app.use(
  "/",
  express.static(path.join(__dirname, "dist", "frontend", "browser"))
);

app.get("/*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "dist", "frontend", "browser", "index.html")
  );
});*/

// ✅ Iniciar servidor
app.listen(config.puerto, () => {
  console.log(`🚀 Servidor funcionando en el puerto: ${config.puerto}`);
});