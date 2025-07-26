const express = require('express');
const router = express.Router();
const controller = require('../controllers/asistencia.controller');

// ✅ Registrar una o varias asistencias
router.post('/', controller.marcarAsistencia);

// ✅ Obtener todas las asistencias
router.get('/', controller.getAsistencias);

// ✅ Obtener asistencias por deportista
router.get('/deportista/:id', controller.getAsistenciasPorDeportista);

// ✅ Obtener resumen mensual
router.get('/resumen/mensual', controller.getResumenMensual);

module.exports = router;
