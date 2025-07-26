// routes/lesiones.routes.js
const express = require("express");
const router = express.Router();
const lesionesController = require("../controllers/lesiones.controller");

// Crear una lesión (POST)
router.post("/", lesionesController.create);

// Obtener todas las lesiones de un deportista (GET)
router.get("/deportista/:id", lesionesController.getByDeportista);

// Obtener una sola lesión por ID (GET)
router.get("/:id", lesionesController.getById);

// Eliminar una lesión por ID (DELETE)
router.delete("/:id", lesionesController.delete);

module.exports = router;
