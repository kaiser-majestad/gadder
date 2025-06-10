// models/AIRecommendation.js
module.exports = (sequelize) => {
  const AIRecommendation = sequelize.define('AIRecommendation', {
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
    recommendation_type: {
      type: DataTypes.ENUM('exercise_plan', 'form_correction', 'injury_prevention'),
      allowNull: false
    },
    content: {
      type: DataTypes.JSON, // Contenido de la recomendación
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium'
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_applied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    expires_at: {
      type: DataTypes.DATE
    }
  });

  return AIRecommendation;
};
