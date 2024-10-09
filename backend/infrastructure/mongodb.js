const mongoose = require('mongoose');

class ConnectToDatabase {
  constructor() {}

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conectado a MongoDB');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      throw new Error('Error connecting');
    }
  }
}

module.exports = ConnectToDatabase;