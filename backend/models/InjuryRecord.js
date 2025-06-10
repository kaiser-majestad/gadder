// models/InjuryRecord.js
module.exports = (sequelize) => {
  const InjuryRecord = sequelize.define('InjuryRecord', {
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
    injury_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    affected_area: {
      type: DataTypes.ENUM(
        'knee', 'ankle', 'hip', 'back', 'shoulder', 
        'elbow', 'wrist', 'neck', 'other'
      ),
      allowNull: false
    },
    severity: {
      type: DataTypes.ENUM('minor', 'moderate', 'severe'),
      allowNull: false
    },
    date_occurred: {
      type: DataTypes.DATE,
      allowNull: false
    },
    recovery_status: {
      type: DataTypes.ENUM('recovering', 'recovered', 'chronic'),
      defaultValue: 'recovering'
    },
    restrictions: {
      type: DataTypes.JSON, // Ejercicios o movimientos restringidos
      defaultValue: []
    },
    notes: {
      type: DataTypes.TEXT
    }
  });

  return InjuryRecord;
};
