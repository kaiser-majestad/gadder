const express = require("express");
const router = express.Router();
const controller = require("../controllers/deportista.equipos.controller");

// GET /api/deportista-equipo/:id → devuelve equipo, compañeros y entrenador
router.get("/:id", controller.getEquipoDelDeportista);

module.exports = router;
