// controllers/lesiones.controller.js
const db = require("../models");
const Lesion = db.HLesiones_Antes;

// 🔹 Crear una lesión
exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (!data.ID_RegistroD) {
      return res.status(400).json({ message: "Falta ID del deportista" });
    }

    const nuevaLesion = await Lesion.create(data);
    res.status(201).json(nuevaLesion);
  } catch (error) {
    console.error("Error creando lesión:", error);
    res.status(500).json({ message: "Error al crear lesión" });
  }
};

// 🔹 Obtener todas las lesiones de un deportista
exports.getByDeportista = async (req, res) => {
  const { id } = req.params;
  try {
    const lesiones = await Lesion.findAll({ where: { ID_RegistroD: id } });
    res.json(lesiones);
  } catch (error) {
    console.error("Error obteniendo lesiones:", error);
    res.status(500).json({ message: "Error al obtener lesiones" });
  }
};

// 🔹 Obtener una lesión por ID
exports.getById = async (req, res) => {
  try {
    const lesion = await Lesion.findByPk(req.params.id);
    if (!lesion) return res.status(404).json({ message: "Lesión no encontrada" });
    res.json(lesion);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// 🔹 Eliminar una lesión (opcional)
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Lesion.destroy({ where: { ID_Lesiones_Antes: id } });
    if (deleted) return res.json({ message: "Lesión eliminada" });
    res.status(404).json({ message: "Lesión no encontrada" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error al eliminar" });
  }
};
