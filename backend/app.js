const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

db.sequelize.sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch(err => console.error("Error sincronizando base de datos:", err));

const equipoRoutes = require("./routes/equipo.routes");
app.use("/api/equipos", equipoRoutes);

const deportistaRoutes = require("./routes/deportista.routes");
app.use("/api/deportistas", deportistaRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

app.listen(3001, () => {
  console.log("Servidor backend corriendo en puerto 3001");
});
