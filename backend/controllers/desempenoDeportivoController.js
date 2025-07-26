const { DesempenoDeportivo } = require('../models');

// ✅ Crear un nuevo registro
exports.crearDesempeno = async (req, res) => {
  try {
    const data = await DesempenoDeportivo.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error('Error al crear desempeño:', error);
    res.status(400).json({ mensaje: 'Error al registrar el desempeño', error });
  }
};

// ✅ Obtener todos los desempeños de un deportista
exports.obtenerPorDeportista = async (req, res) => {
  try {
    const { id } = req.params;
    const desempenos = await DesempenoDeportivo.findAll({
      where: { ID_RegistroD: id },
      order: [['semana', 'ASC']]
    });
    res.json(desempenos);
  } catch (error) {
    console.error('Error al obtener desempeños:', error);
    res.status(500).json({ mensaje: 'Error al obtener los datos', error });
  }
};

// ✅ Obtener un desempeño por ID específico
exports.obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await DesempenoDeportivo.findByPk(id);
    if (!registro) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(registro);
  } catch (error) {
    console.error('Error al buscar desempeño:', error);
    res.status(500).json({ mensaje: 'Error al buscar', error });
  }
};

// ✅ Actualizar un desempeño por ID
exports.actualizarDesempeno = async (req, res) => {
  try {
    const { id } = req.params;
    const [filasActualizadas] = await DesempenoDeportivo.update(req.body, {
      where: { ID_Desempeno: id }
    });
    if (filasActualizadas === 0)
      return res.status(404).json({ mensaje: 'Registro no encontrado' });

    res.json({ mensaje: 'Desempeño actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).json({ mensaje: 'Error al actualizar', error });
  }
};

// ✅ Eliminar un desempeño por ID
exports.eliminarDesempeno = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await DesempenoDeportivo.destroy({
      where: { ID_Desempeno: id }
    });
    if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Desempeño eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar:', error);
    res.status(500).json({ mensaje: 'Error al eliminar', error });
  }
};
