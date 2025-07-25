const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 4000;

const userRouter = require("./router/userRouter");
const todoRouter = require("./router/todoRouter");

app.use("/", todoRouter);
app.use("/login", userRouter);

app.listen(port, (err) => {
  if (err) return console.error("Error starting server: " + err.message);
  console.log(`Server is running on port ${port}`);
});
