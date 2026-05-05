const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./incidencias.db", (err) => {
  if (err) {
    console.error("Error al conectar:", err.message);
  } else {
    console.log("Conectado a SQLite");
  }
});

// Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS incidencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT,
    ubicacion TEXT,
    problema TEXT,
    estado TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;