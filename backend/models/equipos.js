module.exports = (sequelize, DataTypes) => {
  const Equipo = sequelize.define("Equipos", {
    ID_Equipo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Nombre_Equipo: { type: DataTypes.STRING(100), allowNull: false },
    Cantidad_Jugadores: DataTypes.INTEGER,
    Escudo: DataTypes.TEXT,
    Equipacion: DataTypes.STRING(100),
    Entrenador: DataTypes.STRING(100),
  });
  return Equipo;
};
