const Lesion = require('../models/Lesion');

const LesionController = {
  // Crear nueva lesión
  async crearLesion(req, res) {
    try {
      const lesion = new Lesion({
        deportistaId: req.body.deportistaId,
        Tipo_Lesion: req.body.Tipo_Lesion,
        Fecha_Lesion: req.body.Fecha_Lesion,
        Descripcion: req.body.Descripcion,
        Tratamiento: req.body.Tratamiento,
        Tiempo_Recuperacion: req.body.Tiempo_Recuperacion,
        Estado_Actual: req.body.Estado_Actual
      });

      const lesionGuardada = await lesion.save();
      res.status(201).json(lesionGuardada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Obtener lesiones por deportista
  async obtenerLesionesDeportista(req, res) {
    try {
      const lesiones = await Lesion.find({ deportistaId: req.params.deportistaId });
      res.json(lesiones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Actualizar lesión
  async actualizarLesion(req, res) {
    try {
      const lesionActualizada = await Lesion.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(lesionActualizada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar lesión
  async eliminarLesion(req, res) {
    try {
      await Lesion.findByIdAndDelete(req.params.id);
      res.json({ message: 'Lesión eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = LesionController;