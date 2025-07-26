const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models");

const app = express();

// Middleware CORS y parsers
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Servir archivos estáticos (como archivos subidos)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ✅ Importar rutas
const equipoRoutes = require("./routes/equipo.routes");
const deportistaRoutes = require("./routes/deportista.routes");
const entrenadorRoutes = require("./routes/entrenadorRoutes");
const entrenamientoRoutes = require("./routes/entrenamiento.routes");
const tareaRoutes = require("./routes/tarea.routes");
const entregaRoutes = require("./routes/entrega.routes");
const asistenciaRoutes = require("./routes/asistencia.routes");
const deportistaEquipoRoutes = require("./routes/deportistaEquipo.routes");
const lesionesRoutes = require("./routes/lesiones.routes");
const informeRoutes = require('./routes/informe.routes');
const desempenoRoutes = require('./routes/desempenoDeportivoRoutes');

// ✅ Registrar rutas
app.use("/api/equipos", equipoRoutes);
app.use("/api/deportistas", deportistaRoutes);
app.use("/api/entrenadores", entrenadorRoutes);
app.use("/api/entrenamientos", entrenamientoRoutes);
app.use("/api/tareas", tareaRoutes);
app.use("/api/entregas", entregaRoutes); 
app.use("/api/asistencias", asistenciaRoutes);
app.use("/api/deportista-equipo", deportistaEquipoRoutes);
app.use("/api/lesiones", lesionesRoutes);
app.use('/api/informes', informeRoutes);
app.use('/api/desempeno', desempenoRoutes);

// Middleware de errores (último)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// ✅ Esperar unos segundos antes de intentar conectar con la base de datos
const startServer = async () => {
  console.log("⏳ Esperando base de datos...");
  setTimeout(() => {
    db.sequelize.sync()
      .then(() => {
        console.log("✅ Base de datos sincronizada");

        // ✅ Iniciar servidor solo si DB está lista
        const PORT = 3001; // Cambiar a 3001 si lo prefieres
        app.listen(PORT, () => {
          console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
        });
      })
      .catch(err => {
        console.error("❌ Error sincronizando base de datos:", err);
      });
  }, 10000); // Espera 10 segundos antes de intentar conectar
};

startServer();
