const db = require("../models");
const Registro_Deportista = db.Registro_Deportista;
const Equipo = db.Equipos;
const Equipo_Deportistas = db.Equipo_Deportistas;
const Entrenador = db.Registro_Entrenador;

exports.getEquipoDelDeportista = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el deportista y el equipo al que pertenece
    const deportista = await Registro_Deportista.findByPk(id, {
      include: {
        model: Equipo,
        as: "Equipos",
        include: [
          {
            model: Registro_Deportista,
            as: "Jugadores",
            attributes: ["ID_RegistroD", "Nombre_Completo", "Email"]
          }
        ]
      }
    });

    if (!deportista || deportista.Equipos.length === 0) {
      return res.status(404).json({ message: "El deportista no pertenece a ningún equipo." });
    }

    const equipo = deportista.Equipos[0]; // suponiendo que el deportista solo tiene un equipo

    // Buscar entrenador por nombre (almacenado como texto en el equipo)
    const entrenador = await Entrenador.findOne({
      where: { Nombre_Completo: equipo.Entrenador },
      attributes: ["ID_Registro", "Nombre_Completo", "Email", "Foto"]
    });

    res.json({
      equipo: {
        ID_Equipo: equipo.ID_Equipo,
        Nombre_Equipo: equipo.Nombre,
        Escudo: equipo.Escudo,
        Equipacion: equipo.Equipacion,
      },
      entrenador: entrenador || null,
      compañeros: equipo.Jugadores.filter(j => j.ID_RegistroD !== deportista.ID_RegistroD)
    });

  } catch (error) {
    console.error("❌ Error al obtener equipo del deportista:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
