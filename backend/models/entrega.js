module.exports = (sequelize, DataTypes) => {
  const Entrega = sequelize.define('Entrega', {
    ID_Entrega: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ID_Tarea: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ID_RegistroD: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Archivo_Adjunto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Fecha_Entrega: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'entregas'
  });

  Entrega.associate = models => {
    Entrega.belongsTo(models.Tarea, {
      foreignKey: 'ID_Tarea',
      as: 'Tarea',
      onDelete: 'CASCADE'
    });

    Entrega.belongsTo(models.Registro_Deportista, {
      foreignKey: 'ID_RegistroD',
      as: 'Deportista',
      onDelete: 'CASCADE'
    });
  };

  return Entrega;
};

