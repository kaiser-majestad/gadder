const db = require('../models');
const Informe = db.Informe;
const path = require('path');
const fs = require('fs');

exports.createInforme = async (req, res) => {
  try {
    const datos = JSON.parse(req.body.datos || '{}');
    const { Titulo, Descripcion, Mes, Tipo, Destinatarios, ID_Entrenador } = datos;

    if (!ID_Entrenador) {
      return res.status(400).json({ error: 'ID_Entrenador es requerido.' });
    }

    let archivo = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const allowed = ['.pdf', '.docx', '.xlsx'];
      if (!allowed.includes(ext)) {
        return res.status(400).json({ error: 'Archivo no permitido' });
      }
      archivo = `/uploads/${req.file.filename}`;
    }

    const nuevoInforme = await Informe.create({
      Titulo,
      Descripcion,
      Mes,
      Tipo,
      Archivo: archivo,
      ID_Entrenador
    });

    if (Tipo === 'individual' && Array.isArray(Destinatarios)) {
      await nuevoInforme.addDestinatariosIndividuales(Destinatarios);
    } else if (Tipo === 'equipo' && Array.isArray(Destinatarios)) {
      await nuevoInforme.addDestinatariosEquipo(Destinatarios);
    }

    res.status(201).json(nuevoInforme);
  } catch (err) {
    console.error("❌ Error al crear informe:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getInformes = async (req, res) => {
  try {
    const { ID_Entrenador, ID_RegistroD, ID_Equipo, Mes } = req.query;
    const where = {};
    if (ID_Entrenador) where.ID_Entrenador = ID_Entrenador;
    if (Mes) where.Mes = Mes;

    const informes = await Informe.findAll({
      where,
      include: [
        { model: db.Registro_Entrenador, as: 'Entrenador', attributes: ['Nombre_Completo'] },
        { model: db.Registro_Deportista, as: 'DestinatariosIndividuales', attributes: ['ID_RegistroD', 'Nombre_Completo'] },
        { model: db.Equipos, as: 'DestinatariosEquipo', attributes: ['ID_Equipo', 'Nombre_Equipo'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    let filtrados = informes;
    if (ID_RegistroD) {
      filtrados = informes.filter(i =>
        i.DestinatariosIndividuales?.some(d => d.ID_RegistroD == ID_RegistroD)
      );
    } else if (ID_Equipo) {
      filtrados = informes.filter(i =>
        i.DestinatariosEquipo?.some(e => e.ID_Equipo == ID_Equipo)
      );
    }

    res.json(filtrados);
  } catch (err) {
    console.error("❌ Error al obtener informes:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getInformesPorDeportista = async (req, res) => {
  const { id } = req.params;
  try {
    const informes = await Informe.findAll({
      include: [
        {
          model: db.Registro_Deportista,
          as: 'DestinatariosIndividuales',
          where: { ID_RegistroD: id },
          attributes: []
        }
      ]
    });
    res.json(informes);
  } catch (err) {
    console.error("❌ Error al obtener informes del deportista:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateInforme = async (req, res) => {
  try {
    const { id } = req.params;
    const { Titulo, Descripcion, Mes } = req.body;
    const updateData = { Titulo, Descripcion, Mes };

    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const allowed = ['.pdf', '.docx', '.xlsx'];
      if (!allowed.includes(ext)) {
        return res.status(400).json({ error: 'Archivo no permitido' });
      }
      updateData.Archivo = `/uploads/${req.file.filename}`;
    }

    await Informe.update(updateData, { where: { ID_Informe: id } });
    res.json({ message: "Informe actualizado correctamente" });
  } catch (err) {
    console.error("❌ Error al actualizar informe:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInforme = async (req, res) => {
  try {
    const { id } = req.params;
    const informe = await Informe.findByPk(id);
    if (!informe) return res.status(404).json({ error: "Informe no encontrado" });

    if (informe.Archivo) {
      const filePath = path.join(__dirname, '..', 'public', informe.Archivo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await informe.setDestinatariosIndividuales([]);
    await informe.setDestinatariosEquipo([]);
    await Informe.destroy({ where: { ID_Informe: id } });

    res.json({ message: "Informe eliminado correctamente" });
  } catch (err) {
    console.error("❌ Error al eliminar informe:", err);
    res.status(500).json({ error: err.message });
  }
};
