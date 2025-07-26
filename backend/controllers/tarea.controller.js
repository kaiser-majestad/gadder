const db = require("../models");
const Tarea = db.Tarea;

// ✅ Crear tarea (corrigiendo campos vacíos)
exports.createTarea = async (req, res) => {
  try {
    const {
      Titulo,
      Descripcion,
      Fecha_Entrega,
      ID_Equipo,
      ID_RegistroD
    } = req.body;

    const nueva = await Tarea.create({
      Titulo,
      Descripcion,
      Fecha_Entrega,
      ID_Equipo: ID_Equipo === "" ? null : ID_Equipo,
      ID_RegistroD: ID_RegistroD === "" ? null : ID_RegistroD
    });

    res.status(201).json(nueva);
  } catch (error) {
    console.error("❌ Error al crear tarea:", error);
    res.status(500).json({ error: "Error al crear tarea" });
  }
};

// ✅ Obtener todas las tareas
exports.getTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// ✅ Obtener tareas asignadas a un deportista
exports.getTareasPorDeportista = async (req, res) => {
  try {
    const { id } = req.params;
    const tareas = await Tarea.findAll({
      where: { ID_RegistroD: id }
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas del deportista" });
  }
};

// ✅ Obtener tareas asignadas a un equipo
exports.getTareasPorEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const tareas = await Tarea.findAll({
      where: { ID_Equipo: id }
    });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas del equipo" });
  }
};

// ✅ Eliminar tarea por ID
exports.deleteTarea = async (req, res) => {
  try {
    const result = await Tarea.destroy({ where: { ID_Tarea: req.params.id } });
    if (result === 0) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
};

// ✅ Editar/Actualizar tarea
exports.updateTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const {
      Titulo,
      Descripcion,
      Fecha_Entrega,
      ID_Equipo,
      ID_RegistroD
    } = req.body;

    await tarea.update({
      Titulo,
      Descripcion,
      Fecha_Entrega,
      ID_Equipo: ID_Equipo === "" ? null : ID_Equipo,
      ID_RegistroD: ID_RegistroD === "" ? null : ID_RegistroD
    });

    res.json({ message: "Tarea actualizada correctamente", tarea });
  } catch (error) {
    console.error("❌ Error al actualizar tarea:", error);
    res.status(500).json({ error: "Error al actualizar tarea" });
  }
};

