const db = require('../models');
const Entrega = db.Entrega;
const path = require('path');
const fs = require('fs');

// Crear entrega
exports.crearEntrega = async (req, res) => {
  try {
    const { ID_Tarea, ID_RegistroD, Comentario } = req.body;

    let archivoRuta = null;
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const permitido = [
        '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
        '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'
      ];
      if (!permitido.includes(ext)) {
        return res.status(400).json({ error: 'Formato de archivo no permitido' });
      }
      archivoRuta = `/uploads/${req.file.filename}`;
    }

    const nuevaEntrega = await Entrega.create({
      ID_Tarea,
      ID_RegistroD,
      Archivo_Adjunto: archivoRuta,
      Comentario
    });

    res.status(201).json(nuevaEntrega);
  } catch (error) {
    console.error('❌ Error al crear entrega:', error);
    res.status(500).json({ error: 'Error al crear entrega' });
  }
};

// Obtener todas las entregas con nombre del deportista y título de tarea
exports.getEntregas = async (req, res) => {
  try {
    const entregas = await Entrega.findAll({
      include: [
        {
          model: db.Registro_Deportista,
          as: 'Deportista',
          attributes: ['Nombre_Completo']
        },
        {
          model: db.Tarea,
          as: 'Tarea',
          attributes: ['Titulo']
        }
      ]
    });
    res.json(entregas);
  } catch (error) {
    console.error("❌ Error al obtener entregas:", error);
    res.status(500).json({ error: 'Error al obtener entregas' });
  }
};

// Obtener entregas por deportista
exports.getEntregasPorDeportista = async (req, res) => {
  try {
    const { id } = req.params;
    const entregas = await Entrega.findAll({ where: { ID_RegistroD: id } });
    res.json(entregas);
  } catch (error) {
    console.error("❌ Error al obtener entregas por deportista:", error);
    res.status(500).json({ error: "Error al obtener entregas" });
  }
};

// Obtener entregas por tarea
exports.getEntregasPorTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const entregas = await Entrega.findAll({ where: { ID_Tarea: id } });
    res.json(entregas);
  } catch (error) {
    console.error("❌ Error al obtener entregas por tarea:", error);
    res.status(500).json({ error: 'Error al obtener entregas de la tarea' });
  }
};

// Eliminar entrega y archivo adjunto
exports.eliminarEntrega = async (req, res) => {
  try {
    const { id } = req.params;
    const entrega = await Entrega.findByPk(id);
    if (!entrega) {
      return res.status(404).json({ error: 'Entrega no encontrada' });
    }

    // Si hay archivo, eliminarlo físicamente
    if (entrega.Archivo_Adjunto) {
      const rutaAbsoluta = path.join(__dirname, "..", entrega.Archivo_Adjunto);
      if (fs.existsSync(rutaAbsoluta)) {
        fs.unlinkSync(rutaAbsoluta);
      }
    }

    await entrega.destroy();
    res.json({ mensaje: 'Entrega eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar entrega:', error);
    res.status(500).json({ error: 'Error al eliminar entrega' });
  }
};
