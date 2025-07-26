module.exports = (sequelize, DataTypes) => {
  const DesempenoDeportivo = sequelize.define("DesempenoDeportivo", {
    ID_Desempeno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    semana: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    potencia: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    resistencia: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    velocidad: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    precision: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    recuperacion: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    notaGeneral: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ID_RegistroD: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'registro_deportista',
        key: 'ID_RegistroD'
      }
    }
  }, {
    tableName: 'desempeno_deportivo'
  });

  DesempenoDeportivo.associate = (models) => {
    DesempenoDeportivo.belongsTo(models.Registro_Deportista, {
      foreignKey: "ID_RegistroD",
      as: "Deportista",
      onDelete: "CASCADE"
    });
  };

  return DesempenoDeportivo;
};
