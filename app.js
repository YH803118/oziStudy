const express = require("express");

const app = express();

const db = require("./models");
const { Member } = db;

const path = require("path");
app.use(express.static(path.join(__dirname, "Front/build")));

app.use(express.urlencoded({ extended: true }));
// form 태그로 요청된 body를 읽을 수 있도록
// false인 경우 string, array형태만 파싱, true이면 모든 형태를 파싱

// npm install --save multer
const multer = require("multer");
const upload = multer({ dest: "upload" });
// app.post 파라미터에 upload.single("file") 추가

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

app.post("/api/members", upload.single("file"), async (req, res) => {
  //회원추가
  const newMember = req.body;
  const member = Member.build(newMember);
  await member.save();
  res.send(newMember);
});

app.put("/api/members/:id", upload.single("imageUrl"), async (req, res) => {
  //회원정보 수정
  console.log(req.params);
  // const id = 1;
  const { id } = req.params;
  const newInfo = req.body; //수정할 회원정보       db연동일땐 수정할정보만 보내도됨
  const result = await Member.update(newInfo, { where: { userId: id } });
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

const { Study } = db;
app.get("/api/study", async (req, res) => {
  //스터디목록(처음화면)
  const study = await Study.findAll({ order: [["updatedAt", "DESC"]] });
  if (study) {
    res.send(study);
  } else {
    res.status(404).send({ message: "study : zero" });
  }
});

app.get("/api/study/:userid", async (req, res) => {
  //내 스터디
  const { userId } = req.params;
  const mystudy = await Member.findAll({ where: { userId } });
  if (mystudy) {
    res.send(mystudy);
  } else {
    res.status(404).send({ message: "you have not study or search failed" });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`${port} 접속 성공`);
});
