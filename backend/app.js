const express = require('express');
const cors = require('cors');
const ConnectToDatabase = require('./infrastructure/mongodb'); // Tu clase para conectar a MongoDB

const app = express();
const port = process.env.EXPRESS_PORT || 3000;
const host = process.env.EXPRESS_HOST || 'localhost';

// Middleware
app.use(cors());
app.use(express.json()); 

// Conexión a la base de datos
const db = new ConnectToDatabase();
db.connect();

// Rutas
// ... define tus rutas aquí (ej. app.use('/auth', authRoutes))

app.listen(port, host, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});