const express = require("express");
const router = express.Router();
const controller = require("../controllers/deportista.controller");

// Crear deportista
router.post("/", controller.create);

// Login antes que rutas dinámicas
router.post("/login", controller.login);

// Obtener todos
router.get("/", controller.getAll);

// Agregar lesiones a un deportista
router.post('/:id/lesiones', controller.agregarLesiones);

// Rutas dinámicas (después de las fijas)
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
