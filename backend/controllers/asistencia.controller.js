const db = require('../models');
const Asistencia = db.Asistencia;
const { Sequelize } = db;

// Registrar varias asistencias a la vez
exports.marcarAsistencia = async (req, res) => {
  try {
    const datos = req.body;

    if (!Array.isArray(datos) || datos.length === 0) {
      return res.status(400).json({ error: "El cuerpo debe ser un arreglo de asistencias." });
    }

    // Validar que todos los elementos tengan los campos necesarios
    for (const a of datos) {
      if (!a.ID_RegistroD || !a.Fecha || !a.Asistio) {
        return res.status(400).json({ error: "Cada asistencia debe tener ID_RegistroD, Fecha y Asistio." });
      }
    }

    const nuevasAsistencias = await Asistencia.bulkCreate(datos);
    res.status(201).json({ message: "✅ Asistencias registradas correctamente", asistencias: nuevasAsistencias });
  } catch (error) {
    console.error("❌ Error al registrar asistencias:", error);
    res.status(500).json({ error: "Error al registrar asistencias" });
  }
};

// Obtener todas las asistencias
exports.getAsistencias = async (req, res) => {
  try {
    const asistencias = await Asistencia.findAll();
    res.json(asistencias);
  } catch (error) {
    console.error('❌ Error al obtener asistencias:', error);
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
};

// Obtener asistencias por deportista
exports.getAsistenciasPorDeportista = async (req, res) => {
  try {
    const { id } = req.params;
    const asistencias = await Asistencia.findAll({
      where: { ID_RegistroD: id },
    });
    res.json(asistencias);
  } catch (error) {
    console.error('❌ Error al obtener asistencias del deportista:', error);
    res.status(500).json({ error: 'Error al obtener asistencias del deportista' });
  }
};

// Resumen mensual
exports.getResumenMensual = async (req, res) => {
  try {
    const resumen = await db.sequelize.query(`
      SELECT 
        ID_RegistroD,
        DATE_FORMAT(Fecha, '%Y-%m') AS Mes,
        SUM(CASE WHEN Asistio = 'SI' THEN 1 ELSE 0 END) AS Asistencias,
        SUM(CASE WHEN Asistio = 'NO' THEN 1 ELSE 0 END) AS Faltas
      FROM asistencias
      GROUP BY ID_RegistroD, Mes
      ORDER BY Mes DESC
    `, { type: Sequelize.QueryTypes.SELECT });

    res.json(resumen);
  } catch (error) {
    console.error('❌ Error al generar resumen mensual:', error);
    res.status(500).json({ error: 'Error al generar resumen mensual' });
  }
};
