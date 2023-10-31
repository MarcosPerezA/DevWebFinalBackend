const express = require('express');
const router = express.Router();
const Paciente = require('../models/paciente');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticateToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Acceso denegado.');

  jwt.verify(token, config.secret, (err, user) => {
    if (err) return res.status(403).send('Token inválido.');
    req.user = user;
    next();
  });
}

// Rutas de pacientes
router.get('/', authenticateToken, async (req, res) => {
  const pacientes = await Paciente.find();
  res.json(pacientes);
});

router.post('/', authenticateToken, async (req, res) => {
  const paciente = new Paciente(req.body);
  const nuevoPaciente = await paciente.save();
  res.json(nuevoPaciente);
});

router.put('/:id', authenticateToken, async (req, res) => {
  const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(paciente);
});

router.delete('/:id', authenticateToken, async (req, res) => {
  // Eliminar un paciente
  await Paciente.findByIdAndRemove(req.params.id);
  res.json({ message: 'Paciente eliminado' });
});

module.exports = router;
