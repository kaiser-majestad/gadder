const db = require('../models');
const Entrenamiento = db.Entrenamientos;

// Crear un entrenamiento
exports.createEntrenamiento = async (req, res) => {
  try {
    const {
      Nombre_Ejercicio,
      Rutina,
      Tiempo_Estimado,
      Repeticiones,
      Microciclos,
      Temporizador,
      ID_Equipo
    } = req.body;

    if (!ID_Equipo) {
      return res.status(400).json({ error: "El campo ID_Equipo es obligatorio." });
    }

    const nuevo = await Entrenamiento.create({
      Nombre_Ejercicio,
      Rutina,
      Tiempo_Estimado,
      Repeticiones,
      Microciclos,
      Temporizador,
      ID_Equipo  // ✅ Este campo es esencial
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('❌ Error al crear entrenamiento:', error);
    res.status(500).json({ error: 'Error al crear entrenamiento' });
  }
};


// Obtener todos los entrenamientos
exports.getEntrenamientos = async (req, res) => {
  try {
    const entrenamientos = await Entrenamiento.findAll();
    res.json(entrenamientos);
  } catch (error) {
    console.error('❌ Error al obtener entrenamientos:', error);
    res.status(500).json({ error: 'Error al obtener entrenamientos' });
  }
};

// Obtener un entrenamiento por ID
exports.getEntrenamientoById = async (req, res) => {
  try {
    const entrenamiento = await Entrenamiento.findByPk(req.params.id);
    if (!entrenamiento) return res.status(404).json({ error: 'No encontrado' });
    res.json(entrenamiento);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar entrenamiento' });
  }
};

// Actualizar un entrenamiento
exports.updateEntrenamiento = async (req, res) => {
  try {
    await Entrenamiento.update(req.body, {
      where: { ID_Entrenamiento: req.params.id }
    });
    res.json({ message: 'Entrenamiento actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

// Eliminar un entrenamiento
exports.deleteEntrenamiento = async (req, res) => {
  try {
    await Entrenamiento.destroy({ where: { ID_Entrenamiento: req.params.id } });
    res.json({ message: 'Entrenamiento eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

// 🔁 Obtener entrenamientos asignados a un deportista según sus equipos
exports.getEntrenamientosPorDeportista = async (req, res) => {
  try {
    const { id } = req.params;

    const deportista = await db.Registro_Deportista.findByPk(id, {
      include: {
        model: db.Equipos,
        as: "Equipos",
        through: { attributes: [] },
        include: {
          model: db.Entrenamientos,
          as: "Entrenamientos"
        }
      }
    });

    if (!deportista) {
      return res.status(404).json({ error: "Deportista no encontrado" });
    }

    // Combinar entrenamientos de todos los equipos (puede haber duplicados si un entrenamiento está asignado a varios equipos)
    const entrenamientos = deportista.Equipos.flatMap(eq => eq.Entrenamientos);

    res.json(entrenamientos);
  } catch (error) {
    console.error("❌ Error al obtener entrenamientos por deportista:", error);
    res.status(500).json({ error: "Error al obtener entrenamientos por deportista" });
  }
};
