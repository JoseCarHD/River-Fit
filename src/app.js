const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const session = require("./config/sessionConfig");
const errorHandler = require("./middleware/errorHandler");
const crypto = require("crypto");

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const viewsRoutes = require("./routes/viewsRoutes");

const app = express();

// Middleware para generar un nonce y añadirlo a res.locals
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("base64");
  next();
});

// Middleware de Helmet
app.use((req, res, next) => {
  const nonce = res.locals.nonce;
  res.setHeader(
    "Content-Security-Policy",
    `script-src 'self' 'nonce-${nonce}' https://cdn.jsdelivr.net; style-src 'self' 'nonce-${nonce}' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;`
  );
  next();
});



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(session);

// Sirve archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", viewsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Manejo de errores
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
