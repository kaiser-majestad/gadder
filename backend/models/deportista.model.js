
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Registro_Deportista", {
    ID_RegistroD: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    No_Documento: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    Nombre_Completo: { type: DataTypes.STRING(60), allowNull: false },
    Fecha_Nacimiento: { type: DataTypes.DATE, allowNull: false },
    Genero: { type: DataTypes.ENUM("MASCULINO", "FEMENINO"), allowNull: false },
    Direccion: { type: DataTypes.STRING(40), allowNull: false },
    Telefono: { type: DataTypes.STRING(15), allowNull: false },
    Email: { type: DataTypes.STRING(150), allowNull: false },
    Contraseña: { type: DataTypes.STRING(100), allowNull: false },
    Tienes_Lesiones: { type: DataTypes.ENUM("SI", "NO") },
    Eps: { type: DataTypes.STRING(30), allowNull: false },
    Tipo_De_Sangre: { type: DataTypes.ENUM("B+", "B-", "A+", "A-", "AB+", "AB-", "O+", "O-"), allowNull: false },
    Alergias: { type: DataTypes.STRING(100), allowNull: false },
   
  });
};

