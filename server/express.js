/* eslint-disable no-console */
const express = require("express");
const app = express();
const PORT = process.env.NODE_ENV === "production" ? 3001 : 3002;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/test", (req, res) => {
  res.send("이거는 TEST");
});

app.use((req, res, next) => {
  if (req.headers.token) {
    req.user = true;
    next();
  } else {
    res.status(400).send("invalid user");
  }
});

app.post("/test", (req, res) => {
  res.send("이거는 POST Test");
});

// ===
app.listen(PORT, () => {
  console.log(`server listen on ${PORT}`);
});
