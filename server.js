const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

/* Obtener incidencias */
app.get("/incidencias", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM incidencias").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Crear incidencia */
app.post("/incidencias", (req, res) => {
  try {
    const { cliente, ubicacion, problema, estado } = req.body;

    const stmt = db.prepare(`
      INSERT INTO incidencias (cliente, ubicacion, problema, estado)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(cliente, ubicacion, problema, estado);

    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Actualizar estado */
app.put("/incidencias/:id", (req, res) => {
  try {
    const { estado } = req.body;

    const stmt = db.prepare(`
      UPDATE incidencias
      SET estado=?
      WHERE id=?
    `);

    const result = stmt.run(estado, req.params.id);

    res.json({ cambios: result.changes });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Eliminar */
app.delete("/incidencias/:id", (req, res) => {
  try {
    const stmt = db.prepare(`
      DELETE FROM incidencias
      WHERE id=?
    `);

    const result = stmt.run(req.params.id);

    res.json({ eliminados: result.changes });
  } catch (err) {
    res.status(500).json(err);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});