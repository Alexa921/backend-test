const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const config = require("./config");

const app = express();

// ✅ Configuración de CORS correctamente
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || config.listablanca.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("No permitido por CORS: " + origin));
    },
    credentials: true,
  })
);

// ✅ Middleware para parsear JSON (necesario para leer req.body)
app.use(express.json());

// ✅ Configuración de sesiones
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: config.expiracion,
      httpOnly: true,
    },
    name: "cookieApp",
    rolling: true,
  })
);

// ✅ Rutas
require("./rutas.js")(app);

// ✅ Conexión a MongoDB
mongoose
  .connect(`mongodb://127.0.0.1:27017/${config.db}`)
  .then(() => {
    console.log("✅ Conexión a la base de datos establecida");
    app.listen(config.puerto, () => {
      console.log(`🚀 Servidor funcionando en el puerto: ${config.puerto}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a la base de datos:", err);
  });