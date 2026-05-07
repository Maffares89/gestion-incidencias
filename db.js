const Database = require("better-sqlite3");

const db = new Database("incidencias.db");

console.log("Conectado a SQLite");

db.prepare(`
  CREATE TABLE IF NOT EXISTS incidencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT,
    ubicacion TEXT,
    problema TEXT,
    estado TEXT
  )
`).run();

module.exports = db;