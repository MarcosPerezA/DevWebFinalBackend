const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  correo: String,
  clave: String,
});

module.exports = mongoose.model('registroadmins', adminSchema);
