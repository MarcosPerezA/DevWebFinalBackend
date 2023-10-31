const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const config = require('./config/config');
const pacientesRoute = require('./routes/pacientes');
const authRoute = require('./routes/auth');

const app = express();
app.use(cors()); // Habilita CORS
app.use(bodyParser.json());

// Conectar a la base de datos
mongoose.connect('mongodb+srv://Marjo1706_:Cuilapa2023.@cluster0.gihwsws.mongodb.net/Expedientes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida con éxito');
});

// Rutas
app.use('/pacientes', pacientesRoute);
app.use('/auth', authRoute);

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
