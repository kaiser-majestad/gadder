module.exports = (sequelize, DataTypes) => {
  const Entrenamiento = sequelize.define('Entrenamiento', {
    ID_Entrenamiento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre_Ejercicio: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Rutina: {
      type: DataTypes.TEXT('long'), // ✅ permite rutinas extensas
      allowNull: false
    },
    Tiempo_Estimado: {
      type: DataTypes.STRING(100), // ✅ más espacio que STRING(20)
      allowNull: false
    },
    Repeticiones: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Microciclos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Temporizador: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ID_Equipo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'entrenamientos'
  });

  return Entrenamiento;
};
