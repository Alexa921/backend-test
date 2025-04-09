const config = {
  puerto: process.env.PUERTO || 3001,
  db: process.env.DB || "Backend",
  expiracion: process.env.EXPIRACION || 1000 * 60 * 60,
  secret: "test_secret",
  email: {
    host: "smtp.gmail.com",  
    port: 587,               
    user: "tu_correo@gmail.com", 
    pass: "tu_contraseña"       
  },
  listablanca: ["http://localhost:4200"],
};

module.exports = config;


  