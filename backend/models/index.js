const Sequelize = require("sequelize");
const config = require("../config/db.config");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Registro_Deportista = require("./deportista.model")(sequelize, Sequelize);
db.HLesiones_Antes = require("./hlesiones.model")(sequelize, Sequelize);

db.Registro_Deportista.belongsTo(db.HLesiones_Antes, {
  foreignKey: "ID_Lesiones_Antes",
});

module.exports = db;

