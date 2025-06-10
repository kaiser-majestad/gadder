
// models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 13,
        max: 120
      }
    },
    height: {
      type: DataTypes.FLOAT, // en cm
    },
    weight: {
      type: DataTypes.FLOAT, // en kg
    },
    fitness_level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner'
    },
    injury_history: {
      type: DataTypes.JSON, // Array de lesiones previas
      defaultValue: []
    },
    preferences: {
      type: DataTypes.JSON, // Preferencias de entrenamiento
      defaultValue: {}
    }
  });

  return User;
};

// Importar modelos
const User = require('../models/user')(sequelize);
const ExerciseSession = require('../models/exercisesesion')(sequelize);
const InjuryRecord = require('../models/InjuryRecord')(sequelize);
const AIRecommendation = require('../models/AIRecommendation')(sequelize);

// Definir asociaciones
User.hasMany(ExerciseSession, { foreignKey: 'user_id' });
ExerciseSession.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(InjuryRecord, { foreignKey: 'user_id' });
InjuryRecord.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(AIRecommendation, { foreignKey: 'user_id' });
AIRecommendation.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  ExerciseSession,
  InjuryRecord,
  AIRecommendation
};

// =====================================================
// CONTROLADORES
// =====================================================
