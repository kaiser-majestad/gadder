const db = require("../models");
const Equipo = db.Equipos;
const EquipoDeportistas = db.Equipo_Deportistas;

exports.createEquipo = async (req, res) => {
  try {
    const { Nombre_Equipo, Cantidad_Jugadores, Escudo, Equipacion, Entrenador, jugadores } = req.body;

    const nuevoEquipo = await Equipo.create({ Nombre_Equipo, Cantidad_Jugadores, Escudo, Equipacion, Entrenador });

    if (jugadores && jugadores.length > 0) {
      await nuevoEquipo.setRegistro_Deportista(jugadores); // conecta con los ID de jugadores
    }

    res.status(201).json(nuevoEquipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEquipos = async (req, res) => {
  try {
    const equipos = await Equipo.findAll({ include: db.Registro_Deportista });
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
