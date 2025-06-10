const express = require("express");
const router = express.Router();
const controller = require("../controllers/deportista.controller");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post("/login", controller.login);
router.get('/:id', controller.getById);
router.post('/:id/lesiones', controller.agregarLesiones); // Nueva ruta

module.exports = router;