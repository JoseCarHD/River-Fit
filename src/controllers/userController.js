exports.register = (req, res) => {
    const { nombre, telefono, mensualidad } = req.body;
    // Aquí manejarás la lógica de registro de usuarios
    res.json({ message: 'Usuario registrado correctamente' });
};
