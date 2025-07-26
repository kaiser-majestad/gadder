const express = require('express');
const router = express.Router();
const informeController = require('../controllers/informe.controller');
const upload = require('../middlewares/upload'); // ✅ Ruta corregida


router.post('/', upload.single('archivo'), informeController.createInforme);
router.get('/', informeController.getInformes);
router.get('/deportista/:id', informeController.getInformesPorDeportista);
router.put('/:id', upload.single('archivo'), informeController.updateInforme);
router.delete('/:id', informeController.deleteInforme);

module.exports = router;
