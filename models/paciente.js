const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  diagnostico: String,
  medicos: [String],
  fechaUltimaCita: Date,
  direccion: String,
  numeroTelefono: String,
  correo: String,
});

module.exports = mongoose.model('Paciente', pacienteSchema);
