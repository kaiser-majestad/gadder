const mongoose = require('mongoose');

const LesionSchema = new mongoose.Schema({
  deportistaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deportista',
    required: true
  },
  Tipo_Lesion: {
    type: String,
    required: true
  },
  Fecha_Lesion: {
    type: Date,
    required: true
  },
  Descripcion: {
    type: String,
    required: true
  },
  Tratamiento: String,
  Tiempo_Recuperacion: String,
  Estado_Actual: {
    type: String,
    enum: ['RECUPERADO', 'EN TRATAMIENTO', 'CRÓNICO'],
    default: 'EN TRATAMIENTO'
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesion', LesionSchema);