module.exports = (sequelize, DataTypes) => { 
  const Lesion = sequelize.define("lesiones_antes", {
    ID_Lesiones_Antes: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Añadir_Lesion_Antes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Detalles_Lesion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Tiempo_Fuera_Competencia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Gravedad: {
      type: DataTypes.ENUM("LEVE", "MODERADA", "GRAVE"),
      allowNull: true
    },
    Recaidas: {
      type: DataTypes.ENUM("SI", "NO"),
      allowNull: true
    },
    Lesiones_Fuera: {
      type: DataTypes.ENUM("SI", "NO"),
      allowNull: true
    },
    Dolor_Molestia: {
      type: DataTypes.ENUM("SI", "NO"),
      allowNull: true
    },
    Cirugias: {
      type: DataTypes.ENUM("SI", "NO"),
      allowNull: true
    },
    Posicion: {
      type: DataTypes.ENUM(
        "CENTRAL",
        "REMATADOR",
        "LIBERO",
        "ARMADOR",
        "ZAGUERO DERECHO",
        "ZAGUERO IZQUIERDO"
      ),
      allowNull: true
    },
    Tipo_lesion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ID_RegistroD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'registro_deportista',
        key: 'ID_RegistroD'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'lesiones_antes',
    timestamps: false
  });

  Lesion.associate = models => {
    Lesion.belongsTo(models.Registro_Deportista, {
      foreignKey: 'ID_RegistroD',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Lesion;
};
