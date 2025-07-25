const express = require("express");
const todoRouter = express();
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("./todo.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error("Database opening error: " + err.message);
});

let sql;

todoRouter.use(bodyParser.json());

// Create Todo
todoRouter.post("/items", (req, res) => {
  try {
    const { text } = req.body;

    sql = `INSERT INTO todo (text) VALUES (?)`;
    db.run(sql, [text], (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "todo creation error: " + err.message });
    });
    return res.status(201).json({
      message: "Todo item created successfully",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get Todo List
todoRouter.get("/items", (req, res) => {
  try {
    sql = `SELECT * FROM todo`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error retrieving todo items: " + err.message });
      }
      return res.status(200).json({ data: rows });
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get Todo by ID
todoRouter.get("/items/:id", (req, res) => {
  try {
    const id = req.params.id;
    sql = `SELECT * FROM todo WHERE ID = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error retrieving todo item: " + err.message });
      }
      if (!row) {
        return res.status(404).json({ message: "Todo item not found" });
      }
      return res.status(200).json({ data: row });
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete Todo by ID
todoRouter.delete("/items/:id", (req, res) => {
  try {
    const id = req.params.id;
    sql = `DELETE FROM todo WHERE ID = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error deleting todo item: " + err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: "Todo item not found" });
      }
      return res
        .status(200)
        .json({ message: "Todo item deleted successfully" });
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = todoRouter;
