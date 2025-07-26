const Sequelize = require("sequelize");
const config = require("../config/db.config");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.Registro_Deportista = require("./deportista.model")(sequelize, Sequelize);
db.HLesiones_Antes = require("./lesiones_model")(sequelize, Sequelize);
db.Registro_Entrenador = require("./registro_entrenador")(sequelize, Sequelize);
db.Perfil_Entrenador = require("./perfil_entrenador")(sequelize, Sequelize);
db.Equipos = require("./equipos")(sequelize, Sequelize);
db.Equipo_Deportistas = require("./equipo_deportistas")(sequelize, Sequelize);
db.Asistencia = require("./asistencia")(sequelize, Sequelize);
db.Entrenamientos = require("./entrenamiento")(sequelize, Sequelize);
db.Tarea = require("./tarea")(sequelize, Sequelize);
db.Entrega = require("./entrega")(sequelize, Sequelize);
db.Informe = require("./Informe")(sequelize, Sequelize);
db.DesempenoDeportivo = require("./DesempenoDeportivo")(sequelize, Sequelize); // NUEVO MODELO

// Relaciones: Deportista ↔ Lesiones
db.Registro_Deportista.hasMany(db.HLesiones_Antes, {
  foreignKey: "ID_RegistroD",
  as: "Lesiones",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
db.HLesiones_Antes.belongsTo(db.Registro_Deportista, {
  foreignKey: "ID_RegistroD",
  as: "Deportista"
});

// Relaciones: Entrenador ↔ Perfil
db.Registro_Entrenador.hasOne(db.Perfil_Entrenador, {
  foreignKey: "ID_Registro",
  as: "Perfil_Entrenador",
  onDelete: "CASCADE"
});
db.Perfil_Entrenador.belongsTo(db.Registro_Entrenador, {
  foreignKey: "ID_Registro",
  onDelete: "CASCADE"
});

// Equipos ↔ Deportistas (Muchos a Muchos)
db.Equipos.belongsToMany(db.Registro_Deportista, {
  through: db.Equipo_Deportistas,
  foreignKey: "ID_Equipo",
  otherKey: "ID_RegistroD",
  as: "Jugadores"
});
db.Registro_Deportista.belongsToMany(db.Equipos, {
  through: db.Equipo_Deportistas,
  foreignKey: "ID_RegistroD",
  otherKey: "ID_Equipo",
  as: "Equipos"
});

// Deportista ↔ Asistencia
db.Registro_Deportista.hasMany(db.Asistencia, {
  foreignKey: "ID_RegistroD",
  as: "Asistencias"
});
db.Asistencia.belongsTo(db.Registro_Deportista, {
  foreignKey: "ID_RegistroD",
  as: "Deportista"
});

// Equipos ↔ Entrenamientos
db.Equipos.hasMany(db.Entrenamientos, {
  foreignKey: { name: "ID_Equipo", allowNull: true },
  as: "Entrenamientos",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
db.Entrenamientos.belongsTo(db.Equipos, {
  foreignKey: { name: "ID_Equipo", allowNull: true },
  as: "Equipo",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

// Tareas
db.Equipos.hasMany(db.Tarea, {
  foreignKey: "ID_Equipo",
  as: "Tareas"
});
db.Tarea.belongsTo(db.Equipos, {
  foreignKey: "ID_Equipo",
  as: "Equipo"
});
db.Registro_Deportista.hasMany(db.Tarea, {
  foreignKey: "ID_RegistroD",
  as: "TareasIndividuales"
});
db.Tarea.belongsTo(db.Registro_Deportista, {
  foreignKey: "ID_RegistroD",
  as: "Deportista"
});

// Entregas
db.Tarea.hasMany(db.Entrega, {
  foreignKey: "ID_Tarea",
  as: "Entregas"
});
db.Entrega.belongsTo(db.Tarea, {
  foreignKey: "ID_Tarea",
  as: "Tarea",
  onDelete: "CASCADE"
});
db.Registro_Deportista.hasMany(db.Entrega, {
  foreignKey: "ID_RegistroD",
  as: "Entregas",
  onDelete: "CASCADE"
});
db.Entrega.belongsTo(db.Registro_Deportista, {
  foreignKey: "ID_RegistroD",
  as: "Deportista",
  onDelete: "CASCADE"
});

// Informe ↔ Deportistas
db.Informe.belongsToMany(db.Registro_Deportista, {
  through: "Informe_Deportistas",
  foreignKey: "ID_Informe",
  otherKey: "ID_RegistroD",
  as: "DestinatariosIndividuales"
});
db.Registro_Deportista.belongsToMany(db.Informe, {
  through: "Informe_Deportistas",
  foreignKey: "ID_RegistroD",
  otherKey: "ID_Informe",
  as: "InformesRecibidos"
});

// Informe ↔ Equipos
db.Informe.belongsToMany(db.Equipos, {
  through: "Informe_Equipos",
  foreignKey: "ID_Informe",
  otherKey: "ID_Equipo",
  as: "DestinatariosEquipo"
});
db.Equipos.belongsToMany(db.Informe, {
  through: "Informe_Equipos",
  foreignKey: "ID_Equipo",
  otherKey: "ID_Informe",
  as: "InformesEquipo"
});

// Informe ↔ Entrenador
db.Informe.belongsTo(db.Registro_Entrenador, {
  foreignKey: "ID_Entrenador",
  as: "Entrenador"
});

// 🆕 Deportista ↔ Desempeño Deportivo
db.Registro_Deportista.hasMany(db.DesempenoDeportivo, {
  foreignKey: "ID_RegistroD",
  as: "Desempenos",
  onDelete: "CASCADE"
});
db.DesempenoDeportivo.belongsTo(db.Registro_Deportista, {
  foreignKey: "ID_RegistroD",
  as: "Deportista"
});

module.exports = db;
