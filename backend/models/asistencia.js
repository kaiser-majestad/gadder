module.exports = (sequelize, DataTypes) => {
  const Asistencia = sequelize.define('Asistencia', {
    ID_Asistencia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ID_RegistroD: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Asistio: {
      type: DataTypes.ENUM('SI', 'NO'),
      allowNull: false
    }
  }, {
    tableName: 'asistencias',
    timestamps: false
  });

  return Asistencia;
};
