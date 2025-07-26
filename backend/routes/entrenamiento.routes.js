const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrenamiento.controller');

router.post('/', controller.createEntrenamiento);
router.get('/', controller.getEntrenamientos);
router.get('/:id', controller.getEntrenamientoById);
router.get('/deportista/:id', controller.getEntrenamientosPorDeportista);
router.put('/:id', controller.updateEntrenamiento);
router.delete('/:id', controller.deleteEntrenamiento);

module.exports = router;
