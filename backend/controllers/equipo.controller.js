const db = require("../models");
const Equipo = db.Equipos;
const Registro_Deportista = db.Registro_Deportista;
const Equipo_Deportistas = db.Equipo_Deportistas;
const path = require("path");
const { Op } = require("sequelize");

// ✅ Crear equipo (sin roles ni tokens)
exports.createEquipo = async (req, res) => {
  try {
    const {
      Nombre_Equipo,
      Cantidad_Jugadores,
      Equipacion,
      Entrenador,
      jugadores
    } = req.body;

    let parsedJugadores = [];
    try {
      parsedJugadores = typeof jugadores === 'string' ? JSON.parse(jugadores) : jugadores;
    } catch (err) {
      return res.status(400).json({ error: 'El formato de jugadores no es válido.' });
    }

    let escudoPath = null;
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const allowed = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"];
      if (!allowed.includes(ext)) {
        return res.status(400).json({ error: "Archivo no válido. Debe ser una imagen." });
      }
      escudoPath = `/uploads/${req.file.filename}`;
    }

    const nuevoEquipo = await Equipo.create({
      Nombre_Equipo,
      Cantidad_Jugadores,
      Escudo: escudoPath,
      Equipacion,
      Entrenador
    });

    if (Array.isArray(parsedJugadores) && parsedJugadores.length > 0) {
      const jugadoresAsignados = await Equipo_Deportistas.findAll({
        where: { ID_RegistroD: parsedJugadores }
      });

      const idsAsignados = jugadoresAsignados.map(j => j.ID_RegistroD);
      const idsDisponibles = parsedJugadores.filter(id => !idsAsignados.includes(id));

      if (idsDisponibles.length > 0) {
        await nuevoEquipo.addJugadores(idsDisponibles);
      }

      return res.status(201).json({
        equipo: nuevoEquipo,
        asignados: idsDisponibles,
        ignorados: idsAsignados,
        message: idsAsignados.length > 0
          ? `Algunos jugadores ya estaban asignados a otro equipo.`
          : "Equipo creado exitosamente."
      });
    } else {
      return res.status(201).json({ equipo: nuevoEquipo, message: "Equipo creado sin jugadores." });
    }
  } catch (error) {
    console.error("❌ Error al crear equipo:", error);
    res.status(500).json({ error: "Error al crear equipo: " + error.message });
  }
};


// ✅ Obtener equipos (sin filtro por entrenador)
exports.getEquipos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const whereClause = {}; // 🔓 ya no filtramos por entrenador

    const { count, rows } = await Equipo.findAndCountAll({
      where: whereClause,
      include: {
        model: db.Registro_Deportista,
        as: "Jugadores",
        attributes: ["ID_RegistroD", "Nombre_Completo", "Email"],
        through: { attributes: [] }
      },
      limit: parseInt(limit),
      offset,
      order: [["Nombre_Equipo", "ASC"]]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: parseInt(page),
      equipos: rows || []
    });
  } catch (error) {
    console.error("❌ Error al obtener equipos:", error);
    res.status(500).json({ error: "Error al obtener equipos: " + error.message });
  }
};


// ✅ Asignar jugadores a equipo
exports.asignarJugadores = async (req, res) => {
  try {
    const { id } = req.params;
    const { jugadores } = req.body;

    const equipo = await Equipo.findByPk(id);
    if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });

    const jugadoresAsignados = await Equipo_Deportistas.findAll({
      where: { ID_RegistroD: jugadores }
    });

    const idsAsignados = jugadoresAsignados.map(j => j.ID_RegistroD);
    const idsDisponibles = jugadores.filter(id => !idsAsignados.includes(id));

    if (idsDisponibles.length > 0) {
      await equipo.addJugadores(idsDisponibles);
    }

    res.json({
      message: "Asignación completada",
      asignados: idsDisponibles,
      ignorados: idsAsignados
    });
  } catch (error) {
    console.error("❌ Error al asignar jugadores:", error);
    res.status(500).json({ error: "Error al asignar jugadores: " + error.message });
  }
};

// ✅ Eliminar jugador de equipo
exports.eliminarJugador = async (req, res) => {
  try {
    const { id, idJugador } = req.params;

    const equipo = await Equipo.findByPk(id);
    if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });

    await equipo.removeJugadores(idJugador);
    res.json({ message: "Jugador eliminado del equipo correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar jugador:", error);
    res.status(500).json({ error: "Error al eliminar jugador: " + error.message });
  }
};

// ✅ Eliminar equipo (sin restricción de creador/super)
exports.eliminarEquipo = async (req, res) => {
  try {
    const { id } = req.params;

    const equipo = await Equipo.findByPk(id);
    if (!equipo) return res.status(404).json({ error: "Equipo no encontrado" });

    await equipo.destroy();
    res.json({ message: "Equipo eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar equipo:", error);
    res.status(500).json({ error: "Error al eliminar equipo: " + error.message });
  }
};
