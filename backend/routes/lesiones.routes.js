const express = require('express');
const router = express.Router();
const LesionController = require('../controllers/LesionController');

// Crear una nueva lesión
router.post('/api/lesiones', LesionController.crearLesion);

// Obtener lesiones de un deportista
router.get('/api/lesiones/deportista/:deportistaId', LesionController.obtenerLesionesDeportista);

// Actualizar una lesión
router.put('/api/lesiones/:id', LesionController.actualizarLesion);

// Eliminar una lesión
router.delete('/api/lesiones/:id', LesionController.eliminarLesion);

module.exports = router;