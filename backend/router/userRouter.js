const express = require("express");
const userRouter = express();
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("./user.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error("Database opening error: " + err.message);
});

let sql;

userRouter.use(bodyParser.json());

userRouter.post("/", (req, res) => {
  const { username, password } = req.body;
  sql = `SELECT * FROM user WHERE username = ? AND password = ?`;

  db.get(sql, [username, password], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "User login error: " + err.message });
    }
    if (!row) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({
      message: "Login successful",
      user: {
        username: row.username,
      },
    });
  });
});

userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  sql = `INSERT INTO user (username, password) VALUES (?, ?)`;

  db.run(sql, [username, password], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "User registration error: " + err.message });
    }
    return res.status(201).json({ message: "User registered successfully" });
  });
});

module.exports = userRouter;
