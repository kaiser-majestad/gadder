module.exports = (sequelize, DataTypes) => {
  const Informe = sequelize.define('Informe', {
    ID_Informe: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.TEXT
    },
    Mes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Archivo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ID_Entrenador: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Informe'
  });

  Informe.associate = (models) => {
    Informe.belongsTo(models.Registro_Entrenador, {
      foreignKey: 'ID_Entrenador',
      as: 'Entrenador'
    });

    Informe.belongsToMany(models.Registro_Deportista, {
      through: 'Informe_Deportistas',
      foreignKey: 'ID_Informe',
      otherKey: 'ID_RegistroD',
      as: 'DestinatariosIndividuales' // ✅ ALIAS CORRECTO
    });

    Informe.belongsToMany(models.Equipos, {
      through: 'Informe_Equipos',
      foreignKey: 'ID_Informe',
      otherKey: 'ID_Equipo',
      as: 'DestinatariosEquipo' // ✅ ALIAS CORRECTO
    });
  };

  return Informe;
};
