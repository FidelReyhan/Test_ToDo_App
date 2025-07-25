const sqlite3 = require("sqlite3").verbose();

const dbTodo = new sqlite3.Database(
  "./todo.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) return console.error("Database opening error: " + err.message);
  }
);
const sqlTodo = `CREATE TABLE IF NOT EXISTS todo (ID INTEGER PRIMARY KEY AUTOINCREMENT, text, done INTEGER DEFAULT 0);`;
dbTodo.run(sqlTodo, (err) => {
  if (err) return console.error("Table creation error: " + err.message);
});

const dbUser = new sqlite3.Database(
  "./user.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) return console.error("Database opening error: " + err.message);
  }
);

const sqlUser = `CREATE TABLE IF NOT EXISTS user(ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL);`;
dbUser.run(sqlUser, (err) => {
  if (err) return console.error("Table creation error: " + err.message);
});
