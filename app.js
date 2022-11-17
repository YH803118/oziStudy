const express = require("express");

const app = express();

const db = require("./models");
const { Member } = db;

const path = require("path");
app.use(express.static(path.join(__dirname, "Front/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Front/build/index.html"));
});

app.get("/api/members", async (req, res) => {
  const { tag } = req.query;
  if (tag) {
    const teamMembers = await Member.findAll({
      where: { tag },
      order: [["id", "DESC"]],
    });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll();
    res.send(members);
  }
});

app.get("/api/members/:userId", async (req, res) => {
  //특정아이디의 유저 찾음
  const { userId } = req.params;
  const member = await Member.findOne({ where: { userId } });
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no such member" });
  }
});

app.post("/api/members", async (req, res) => {
  //회원추가
  const newMember = req.body;
  const member = Member.build(newMember);
  await member.save();
  res.send(newMember);
});

app.put("/api/members/:id", async (req, res) => {
  //회원정보 수정
  const { id } = req.params;
  const newInfo = req.body; //수정할 회원정보       db연동일땐 수정할정보만 보내도됨
  const result = await Member.update(newInfo, { where: { id } });
  if (result[0]) {
    res.send({ message: `${result[0]} row(s) affected` }); //로우를 출력
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.delete("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const deleteCount = await Member.destroy({ where: { id } }); //조건대로 삭제
  if (deleteCount) {
    res.send({ message: `${deleteCount} row(s) deleted` });
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});
const port = 3001;
app.listen(port, () => {
  console.log(`${port} 접속 성공`);
});
