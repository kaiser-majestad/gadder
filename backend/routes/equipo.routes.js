const express = require("express");
const router = express.Router();
const equipoController = require("../controllers/equipo.controller");
const upload = require("../middlewares/upload");

// ✅ Crear equipo (sin autenticación)
router.post('/', upload.single('Escudo'), equipoController.createEquipo);

// ✅ Obtener equipos
router.get('/', equipoController.getEquipos);

// ✅ Asignar más jugadores al equipo
router.post('/:id/jugadores', equipoController.asignarJugadores);

// ✅ Eliminar un jugador del equipo
router.delete('/:id/jugadores/:idJugador', equipoController.eliminarJugador);

// ✅ Eliminar un equipo
router.delete('/:id', equipoController.eliminarEquipo);

module.exports = router;
