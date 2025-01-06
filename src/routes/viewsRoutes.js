//viewRoutes.js
const path = require('path');
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

// Ruta raíz
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'index.html'));
});

router.get('/login', (req, res) =>
    res.sendFile(path.join(__dirname, '../../public/views', 'login.html'))
);

router.get('/usuarios', isAuthenticated, (req, res) =>{
    res.sendFile(path.join(__dirname, '../../public/views', 'usuarios.html'))
});

router.get('/punto-venta', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'punto-venta.html'))
});

router.get('/productos', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'productos.html'))
});

router.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views', 'blog.html'));
});


router.get('/api/blog', isAuthenticated, (req, res) => {
    // Puedes personalizar esta respuesta según lo que necesites
    res.json({ message: 'Bienvenido al blog!', user: req.user }); // Puedes incluir datos del usuario si lo deseas
});




module.exports = router;