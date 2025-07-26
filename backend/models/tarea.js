module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define('Tarea', {
    ID_Tarea: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Titulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Fecha_Entrega: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ID_Equipo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ID_RegistroD: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tareas',
    timestamps: true
  });

  Tarea.associate = models => {
    // Una tarea puede tener muchas entregas
    Tarea.hasMany(models.Entrega, {
      foreignKey: 'ID_Tarea',
      as: 'Entregas',
      onDelete: 'CASCADE'
    });
  };

  return Tarea;
};
