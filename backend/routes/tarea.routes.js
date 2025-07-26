const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tarea.controller");

// ✅ Rutas necesarias
router.post("/", tareaController.createTarea);
router.get("/", tareaController.getTareas);
router.get("/deportista/:id", tareaController.getTareasPorDeportista);
router.get("/equipo/:id", tareaController.getTareasPorEquipo);
router.put("/:id", tareaController.updateTarea); // <--- ESTA
router.delete("/:id", tareaController.deleteTarea); // <--- Y ESTA

module.exports = router;
