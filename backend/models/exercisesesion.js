// models/ExerciseSession.js
module.exports = (sequelize) => {
  const ExerciseSession = sequelize.define('ExerciseSession', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    exercise_type: {
      type: DataTypes.ENUM('squat', 'pushup', 'plank', 'deadlift', 'pullup'),
      allowNull: false
    },
    repetitions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    duration: {
      type: DataTypes.FLOAT, // en segundos
      allowNull: false
    },
    average_score: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100
      }
    },
    max_score: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100
      }
    },
    feedback_data: {
      type: DataTypes.JSON, // Datos detallados del análisis
      defaultValue: {}
    },
    pose_data: {
      type: DataTypes.JSON, // Datos de poses detectadas (opcional)
      defaultValue: []
    },
    corrections_made: {
      type: DataTypes.JSON, // Correcciones sugeridas
      defaultValue: []
    },
    session_rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  });

  return ExerciseSession;
};
