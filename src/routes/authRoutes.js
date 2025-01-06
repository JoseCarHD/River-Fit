const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const isAuthenticated = require('../middleware/isAuthenticated');

// Ruta de login
router.post('/login', authController.login);

// Ruta de blog que requiere autenticación
router.get('/blog', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'Bienvenido al blog!' });
});

module.exports = router;
