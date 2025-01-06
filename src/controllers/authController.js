// authController.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2'); 
const secretKey = process.env.JWT_SECRET;

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME 
});

// Verificar la conexión
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Función de login
exports.login = (req, res) => {
    const { correo, contraseña } = req.body;
    console.log('Intentando iniciar sesión con:', correo); 

    const query = 'SELECT * FROM usuario WHERE correo = ?';

    db.query(query, [correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ success: false, message: 'Error del servidor' });
        }

        console.log('Resultados de la consulta:', results); // Verifica los resultados obtenidos

        if (results.length === 0) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }

        const user = results[0];
        // Comparar directamente la contraseña en texto plano
        if (contraseña === user.contrasena) {
            const payload = { correo: user.correo };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

            console.log('Login exitoso, token generado:', token);

            // Enviar el token al cliente
            return res.status(200).json({ success: true, token });
        } else {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    });
};
