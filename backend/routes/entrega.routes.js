// routes/entrega.routes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const entregaController = require("../controllers/entrega.controller");

router.post("/", upload.single("Archivo"), entregaController.crearEntrega);
router.get("/deportista/:id", entregaController.getEntregasPorDeportista);
router.get("/tarea/:id", entregaController.getEntregasPorTarea);
router.get("/", entregaController.getEntregas);
router.delete('/:id', entregaController.eliminarEntrega);
    


module.exports = router;
