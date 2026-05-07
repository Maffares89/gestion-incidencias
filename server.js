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
  db.all("SELECT * FROM incidencias", [], (err, rows) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json(rows);
  });
});

/* Crear incidencia */
app.post("/incidencias", (req, res) => {
  const { cliente, ubicacion, problema, estado } = req.body;

  const sql = `INSERT INTO incidencias (cliente, ubicacion, problema, estado)
               VALUES (?, ?, ?, ?)`;

  db.run(sql, [cliente, ubicacion, problema, estado], function (err) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ id: this.lastID });
  });
});

/* Actualizar estado */
app.put("/incidencias/:id", (req, res) => {
  const { estado } = req.body;

  db.run(
    "UPDATE incidencias SET estado=? WHERE id=?",
    [estado, req.params.id],
    function (err) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json({ cambios: this.changes });
    }
  );
});

/* Eliminar */
app.delete("/incidencias/:id", (req, res) => {
  db.run("DELETE FROM incidencias WHERE id=?", [req.params.id], function (err) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({ eliminados: this.changes });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});