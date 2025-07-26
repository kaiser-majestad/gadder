const express = require('express');
const router = express.Router();
const controller = require('../controllers/desempenoDeportivoController');

// Crear nuevo desempeño
router.post('/', controller.crearDesempeno);

// ✅ Obtener todos los desempeños de un deportista
router.get('/deportista/:id', controller.obtenerPorDeportista);

// ✅ Obtener un desempeño individual por ID
router.get('/:id', controller.obtenerPorId);

// Actualizar desempeño por ID
router.put('/:id', controller.actualizarDesempeno);

// Eliminar desempeño por ID
router.delete('/:id', controller.eliminarDesempeno);

module.exports = router;
