const db = require("../models");
const Registro = db.Registro_Deportista;
const Lesion = db.HLesiones_Antes;

// Crear deportista (Versión corregida)
exports.create = async (req, res) => {
  try {
    // 1. Primero crear el deportista
    const nuevoDeportista = await Registro.create(req.body);

    // 2. Si tiene lesiones, crearlas asociadas
    if (req.body.Tienes_Lesiones === "SI" && req.body.Lesiones && req.body.Lesiones.length > 0) {
      const lesionesConDeportista = req.body.Lesiones.map(lesion => ({
        ...lesion,
        ID_RegistroD: nuevoDeportista.ID_RegistroD
      }));
      
      await Lesion.bulkCreate(lesionesConDeportista);
    }

    res.status(201).json({
      ...nuevoDeportista.toJSON(),
      message: "Deportista registrado con éxito"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener deportista por ID (Versión corregida)
exports.getById = async (req, res) => {
  try {
    const deportista = await Registro.findByPk(req.params.id, {
      include: [
        {
          model: db.Equipos,
          as: 'Equipo' // Asegúrate que coincida con el alias de tu relación
        },
        {
          model: Lesion,
          as: 'Lesiones' // Esto debe coincidir con el alias de la relación
        }
      ]
    });

    if (!deportista) {
      return res.status(404).json({ message: "Deportista no encontrado" });
    }

    res.json(deportista);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Agregar lesiones a deportista (Nuevo método)
exports.agregarLesiones = async (req, res) => {
  try {
    const deportista = await Registro.findByPk(req.params.id);
    if (!deportista) {
      return res.status(404).json({ message: "Deportista no encontrado" });
    }

    const lesiones = req.body.map(lesion => ({
      ...lesion,
      ID_RegistroD: req.params.id
    }));

    const lesionesCreadas = await Lesion.bulkCreate(lesiones);
    res.status(201).json(lesionesCreadas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Obtener todos los deportistas
exports.getAll = async (req, res) => {
  try {
    const data = await Registro.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un deportista
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Registro.update(req.body, { where: { ID_RegistroD: id } });
    res.json({ message: "Actualizado correctamente", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un deportista
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Registro.destroy({ where: { ID_RegistroD: id } });
    res.json({ message: "Deportista eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login (Inicio de sesión)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Registro.findOne({ where: { Email: email } });

    if (!usuario || usuario.Contraseña !== password) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.json({ message: "Login exitoso", usuario });
  } catch (err) {
    res.status(500).json({ message: "Error en login", error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const deportista = await Registro.findOne({
      where: { ID_RegistroD: id },
      include: db.Equipos // incluye el equipo al que pertenece
    });
    if (!deportista) {
      return res.status(404).json({ message: "Deportista no encontrado" });
    }
    res.json(deportista);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


