const express = require("express");
const router = express.Router();
const equipoController = require("../controllers/equipo.controller");

// Rutas para equipos (usando los nombres correctos del controlador)
router.post('/', equipoController.createEquipo); // ✔️ Correcto: usa createEquipo
router.get('/', equipoController.getEquipos);    // ✔️ Correcto: usa getEquipos

module.exports = router;