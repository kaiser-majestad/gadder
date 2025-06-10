// controllers/exerciseController.js
const { ExerciseSession, User, InjuryRecord } = require('../config/database');
const aiService = require('../services/aiService');

class ExerciseController {
  // Crear nueva sesión de ejercicio
  async createSession(req, res) {
    try {
      const {
        exercise_type,
        repetitions,
        duration,
        average_score,
        max_score,
        feedback_data,
        pose_data,
        corrections_made
      } = req.body;

      const session = await ExerciseSession.create({
        user_id: req.user.id, // Desde middleware de autenticación
        exercise_type,
        repetitions,
        duration,
        average_score,
        max_score,
        feedback_data,
        pose_data,
        corrections_made
      });

      // Generar recomendaciones basadas en la sesión
      await aiService.generatePostWorkoutRecommendations(req.user.id, session);

      res.status(201).json({
        success: true,
        data: session,
        message: 'Sesión guardada exitosamente'
      });
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({
        success: false,
        message: 'Error al guardar la sesión'
      });
    }
  }

  // Obtener sesiones del usuario
  async getUserSessions(req, res) {
    try {
      const { page = 1, limit = 10, exercise_type } = req.query;
      const offset = (page - 1) * limit;

      const whereClause = { user_id: req.user.id };
      if (exercise_type) {
        whereClause.exercise_type = exercise_type;
      }

      const sessions = await ExerciseSession.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: {
          sessions: sessions.rows,
          totalCount: sessions.count,
          currentPage: parseInt(page),
          totalPages: Math.ceil(sessions.count / limit)
        }
      });
    } catch (error) {
      console.error('Error getting sessions:', error);
      res.status(500)
    }
}
}