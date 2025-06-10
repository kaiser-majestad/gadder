module.exports = (sequelize, DataTypes) => {
  const Equipo_Deportistas = sequelize.define("Equipo_Deportistas", {
    ID_Equipo: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ID_RegistroD: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  });
  return Equipo_Deportistas;
};
