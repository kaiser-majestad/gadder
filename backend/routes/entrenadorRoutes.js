const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrenadorController');
const upload = require('../middlewares/upload'); // asegúrate que esto esté

router.get('/', controller.getEntrenadores);
router.post('/', upload.single('Foto'), controller.createEntrenador);
router.put('/:id', upload.single('Foto'), controller.updateEntrenador); // <-- AQUI
router.delete('/:id', controller.deleteEntrenador);
router.post('/login', controller.loginEntrenador);

module.exports = router;
