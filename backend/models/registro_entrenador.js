module.exports = (sequelize, DataTypes) => {
  const RegistroEntrenador = sequelize.define('Registro_Entrenador', {
    ID_Registro: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre_Completo: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    No_Documento: {
      type: DataTypes.STRING(15),
      allowNull: false // <- Eliminado unique
    },
    Fecha_Nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Genero: {
      type: DataTypes.ENUM('MASCULINO', 'FEMENINO'),
      allowNull: false
    },
    Direccion: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(150),
      allowNull: false // <- Eliminado unique
    },
    Contraseña: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Foto: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Registro_Entrenador'
  });

  RegistroEntrenador.associate = models => {
    RegistroEntrenador.hasOne(models.Perfil_Entrenador, {
      foreignKey: 'ID_Registro',
      as: 'Perfil_Entrenador',
      onDelete: 'CASCADE'
    });
  };

  return RegistroEntrenador;
};
