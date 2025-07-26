module.exports = (sequelize, DataTypes) => {
  const PerfilEntrenador = sequelize.define('Perfil_Entrenador', {
    ID_Entrenador: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ID_Registro: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Especialidad: {
      type: DataTypes.TEXT // Ahora permite textos largos
    },
    Certificacion: {
      type: DataTypes.TEXT
    },
    Experiencia: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'Perfil_Entrenador',
    timestamps: false
  });

  PerfilEntrenador.associate = models => {
    PerfilEntrenador.belongsTo(models.Registro_Entrenador, {
      foreignKey: 'ID_Registro',
      onDelete: 'CASCADE'
    });
  };

  return PerfilEntrenador;
};
