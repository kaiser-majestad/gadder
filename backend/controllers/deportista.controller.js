const db = require("../models");
const Registro = db.Registro_Deportista;
const Lesion = db.HLesiones_Antes;
const { enviarBienvenida } = require("../utils/mailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Crear deportista
exports.create = async (req, res) => {
  try {
    const { Lesiones, ...datosDeportista } = req.body;

    const nuevoDeportista = await Registro.create(datosDeportista);

    console.log("📥 Tiene lesiones:", req.body.Tienes_Lesiones);
    console.log("📥 Lesiones recibidas:", Lesiones);

    if (
      req.body.Tienes_Lesiones === "SI" &&
      Array.isArray(Lesiones) &&
      Lesiones.length > 0
    ) {
      const lesionesConDeportista = Lesiones.map((lesion) => ({
        ...lesion,
        ID_RegistroD: nuevoDeportista.ID_RegistroD,
      }));

      await Lesion.bulkCreate(lesionesConDeportista);
      console.log("✅ Lesiones registradas:", lesionesConDeportista.length);
    } else {
      console.log("ℹ️ No se registraron lesiones");
    }

    // ✉️ Enviar correo de bienvenida
    const email = String(nuevoDeportista.Email || "").trim();
    const nombre = String(nuevoDeportista.Nombre_Completo || "").trim();

    await enviarBienvenida(email, nombre, "deportista");

    res.status(201).json({
      ...nuevoDeportista.toJSON(),
      message: "Deportista registrado con éxito",
    });
  } catch (err) {
    console.error("❌ Error al crear deportista:", err);
    res.status(500).json({ message: "Error al registrar deportista" });
  }
};

// Obtener deportista por ID (con lesiones y equipos)
exports.getById = async (req, res) => {
  try {
    const deportista = await Registro.findByPk(req.params.id, {
      include: [
        {
          model: db.Equipos,
          as: "Equipos",
        },
        {
          model: db.HLesiones_Antes,
          as: "Lesiones",
        },
      ],
    });

    if (!deportista) {
      return res.status(404).json({ message: "Deportista no encontrado" });
    }

    res.json(deportista);
  } catch (err) {
    console.error("❌ Error en getById:", err);
    res.status(500).json({ message: err.message });
  }
};

// Agregar lesiones a un deportista existente
exports.agregarLesiones = async (req, res) => {
  try {
    const deportista = await Registro.findByPk(req.params.id);
    if (!deportista) {
      return res.status(404).json({ message: "Deportista no encontrado" });
    }

    const lesiones = req.body.map((lesion) => ({
      ...lesion,
      ID_RegistroD: req.params.id,
    }));

    const lesionesCreadas = await Lesion.bulkCreate(lesiones);
    res.status(201).json(lesionesCreadas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener todos los deportistas con paginación
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Registro.findAndCountAll({
      offset,
      limit,
      order: [["Nombre_Completo", "ASC"]],
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      deportistas: rows,
    });
  } catch (err) {
    console.error("❌ Error al obtener deportistas:", err);
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un deportista
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Registro.update(req.body, {
      where: { ID_RegistroD: id },
    });
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

// Login (Inicio de sesión con token JWT)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Registro.findOne({
      where: { Email: email },
      include: [
        {
          model: db.HLesiones_Antes,
          as: "Lesiones",
        },
        {
          model: db.Equipos,
          as: "Equipos",
        },
      ],
    });

    if (!usuario || usuario.Contraseña !== password) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const payload = {
      id: usuario.ID_RegistroD,
      email: usuario.Email,
      rol: "deportista",
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login exitoso",
      token,
      user: usuario,
      rol: "deportista",
    });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ message: "Error en login", error: err.message });
  }
};
