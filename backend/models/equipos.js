module.exports = (sequelize, DataTypes) => {
  const Equipo = sequelize.define("Equipos", {
    ID_Equipo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nombre_Equipo: { type: DataTypes.STRING(100), allowNull: false },
    Cantidad_Jugadores: DataTypes.INTEGER,
    Escudo: DataTypes.TEXT,
    Equipacion: DataTypes.STRING(100),
    Entrenador: DataTypes.STRING(100),
  });

  Equipo.associate = (models) => {
    Equipo.belongsToMany(models.Informe, {
      through: 'Informe_Equipos',
      foreignKey: 'ID_Equipo',
      otherKey: 'ID_Informe',
      as: 'Informes'
    });
  };

  return Equipo;
};
