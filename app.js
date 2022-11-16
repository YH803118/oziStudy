const express = require("express");

const app = express();

const db = require("./models");
const { Member } = db;

app.get("/", (req, res) => {
  res.send("<h1>시작</h1>");
});

app.get("/api/members", async (req, res) => {
  const members = await Member.findAll();
  res.send(members);
});
const port = 3001;
app.listen(port, () => {
  console.log(`${port} 접속 성공`);
});
