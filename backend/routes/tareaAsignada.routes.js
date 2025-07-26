const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarea.controller');

router.post('/', controller.createTarea);
router.get('/', controller.getTareas);
router.get('/deportista/:id', controller.getTareasPorDeportista);
router.get('/equipo/:id', controller.getTareasPorEquipo);
router.delete('/:id', controller.deleteTarea);

module.exports = router;
