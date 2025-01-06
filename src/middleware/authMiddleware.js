const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtén el token del encabezado

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
