const db = require('../models');
const Registro = db.Registro_Entrenador;
const Perfil = db.Perfil_Entrenador;
const path = require('path');
const { enviarBienvenida } = require('../utils/mailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Crear entrenador + perfil con imagen y correo de bienvenida
exports.createEntrenador = async (req, res) => {
  try {
    const { registro, perfil } = JSON.parse(req.body.datos);
    console.log("📥 Archivo recibido (registro):", req.file);

    const camposObligatorios = [
      'Nombre_Completo',
      'No_Documento',
      'Fecha_Nacimiento',
      'Genero',
      'Direccion',
      'Telefono',
      'Email',
      'Contraseña'
    ];
    for (let campo of camposObligatorios) {
      if (!registro[campo]) {
        return res.status(400).json({ error: `El campo "${campo}" es obligatorio.` });
      }
    }

    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      if (!allowed.includes(ext)) {
        return res.status(400).json({ error: 'Formato de imagen no permitido.' });
      }
      registro.Foto = `/uploads/${req.file.filename}`;
    }

    const nuevoRegistro = await Registro.create(registro);
    perfil.ID_Registro = nuevoRegistro.ID_Registro;
    const nuevoPerfil = await Perfil.create(perfil);

    // Enviar correo de bienvenida
    const email = String(nuevoRegistro.Email || '').trim();
    const nombre = String(nuevoRegistro.Nombre_Completo || '').trim();

    if (email && email.includes('@')) {
      console.log("📧 Enviando correo a:", email, "(nombre:", nombre, ")");
      await enviarBienvenida(email, nombre, 'entrenador');
    } else {
      console.error('❌ Email inválido para enviar correo:', email);
    }

    res.status(201).json({ registro: nuevoRegistro, perfil: nuevoPerfil });
  } catch (error) {
    console.error('❌ Error al crear entrenador:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email o documento ya registrado.' });
    } else {
      res.status(500).json({ error: error.message || 'Error interno del servidor' });
    }
  }
};

// Obtener entrenadores con perfil y paginación
exports.getEntrenadores = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Registro.findAndCountAll({
      include: {
        model: Perfil,
        as: 'Perfil_Entrenador',
      },
      offset,
      limit,
      order: [['Nombre_Completo', 'ASC']],
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      entrenadores: rows,
    });
  } catch (error) {
    console.error('❌ Error al obtener entrenadores:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar entrenador + perfil con posible imagen
exports.updateEntrenador = async (req, res) => {
  try {
    const { id } = req.params;

    let datos = req.body;
    if (req.body.datos) {
      datos = JSON.parse(req.body.datos);
    }

    const { registro, perfil } = datos;

    console.log("📥 Archivo recibido (update):", req.file);

    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      if (!allowed.includes(ext)) {
        return res.status(400).json({ error: 'Formato de imagen no permitido.' });
      }
      registro.Foto = `/uploads/${req.file.filename}`;
    } else {
      const actual = await Registro.findByPk(id);
      if (actual && actual.Foto) {
        registro.Foto = actual.Foto;
      }
    }

    await Registro.update(registro, { where: { ID_Registro: id } });
    await Perfil.update(perfil, { where: { ID_Registro: id } });

    res.json({ message: 'Entrenador actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar entrenador:', error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar entrenador
exports.deleteEntrenador = async (req, res) => {
  try {
    await Registro.destroy({ where: { ID_Registro: req.params.id } });
    res.json({ message: 'Entrenador eliminado' });
  } catch (error) {
    console.error('❌ Error al eliminar entrenador:', error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login para entrenadores con JWT
exports.loginEntrenador = async (req, res) => {
  const { email, password } = req.body;

  try {
    const entrenador = await Registro.findOne({
      where: { Email: email },
      include: {
        model: Perfil,
        as: 'Perfil_Entrenador',
      },
    });

    if (!entrenador || entrenador.Contraseña !== password) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const payload = {
      id: entrenador.ID_Registro,
      email: entrenador.Email,
      rol: 'entrenador',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login exitoso',
      token,
      user: entrenador,
      rol: 'entrenador',
    });
  } catch (err) {
    console.error('❌ Error en loginEntrenador:', err);
    res.status(500).json({ message: 'Error en login', error: err.message });
  }
};
