const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/login', async (req, res) => {
  const { correo, clave } = req.body;
  const admin = await Admin.findOne({ correo });

  if (!admin) return res.status(404).json({ message: 'Correo no encontrado' });

  if (clave === admin.clave) {
    const token = jwt.sign({ id: admin._id }, config.secret);
    res.header('auth-token', token).json({ token });
  } else {
    res.status(401).json({ message: 'Contraseña incorrecta' });
  }
});

module.exports = router;
