module.exports = (sequelize, DataTypes) => {
  return sequelize.define("HLesiones_Antes", {
    ID_Lesiones_Antes: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Añadir_Lesion_Antes: { type: DataTypes.STRING(200), allowNull: false },
    Fecha: { type: DataTypes.DATE, allowNull: false },
    Detalles_Lesion: { type: DataTypes.STRING(200) },
    Tiempo_Fuera_Competencia: { type: DataTypes.INTEGER, allowNull: false },
    Gravedad: { type: DataTypes.ENUM("LEVE", "GRAVE", "MODERADO"), allowNull: false },
    Recaidas: { type: DataTypes.ENUM("SI", "NO"), allowNull: false },
    Lesiones_Fuera: { type: DataTypes.ENUM("SI", "NO"), allowNull: false },
    Dolor_Molestia: { type: DataTypes.ENUM("SI", "NO"), allowNull: false },
    Cirugias: { type: DataTypes.ENUM("SI", "NO"), allowNull: false },
    Posicion: { type: DataTypes.ENUM("CENTRAL", "REMATADOR", "LIBERO", "ARMADOR", "ZAGUERO DERECHO", "ZAGUERO IZQUIERDO"), allowNull: false },
    Tipo_de_lesion: { type: DataTypes.STRING(255) }
  });
};
