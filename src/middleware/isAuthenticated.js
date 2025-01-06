// middleware/isAuthenticated.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // Asegúrate de que esta clave esté definida en tu archivo .env

const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtiene el token del encabezado

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = decoded; // Guarda el payload decodificado en la solicitud
        next(); // Continúa a la siguiente función de middleware
    });
};

module.exports = isAuthenticated;
