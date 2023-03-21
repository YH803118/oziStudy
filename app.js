const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ credentials: true }));

const db = require("./models");
const { Member } = db;
const { Table } = db;
const { Comment } = db;

const sequelize = require("sequelize");
const Op = sequelize.Op;

const path = require("path");
app.use(express.static(path.join(__dirname, "Front/build")));

app.use(express.urlencoded({ extended: true }));
// form 태그로 요청된 body를 읽을 수 있도록
// false인 경우 string, array형태만 파싱, true이면 모든 형태를 파싱

// npm install --save multer .
const multer = require("multer");
const { fstat } = require("fs");
const fs = require("fs");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});
var upload = multer({ storage });
app.use("/image", express.static("upload"));

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

app.post("/api/members", upload.single("imageFile"), async (req, res) => {
  //회원추가
  const newMember = req.body;
  const member = Member.build(newMember);
  await member.save();
  res.send(newMember);
});

app.post("/api/tables", upload.single("file"), async (req, res) => {
  //스터디 추가
  const newTable = req.body;
  const table = Table.build(newTable);
  await table.save();
  res.send(newTable);
});

app.put("/api/members/:userId", upload.single("imageUrl"), async (req, res) => {
  //회원정보 수정
  const { userId } = req.params;
  const newInfo = req.body;
  if (req.file) {
    const filePath = "https://ozitest.herokuapp.com/image/" + req.file.originalname; //파일이미지를 불러오기위한 경로+이미지파일 이름

    newInfo["imageUrl"] = filePath; //경로를 request의 json파일에 넣어 수정 해준다
  }
  const result = await Member.update(newInfo, { where: { userId } });
  // await Member.update({ imageUrl: req.file }, { where: { userId } });
  if (result[0]) {
    res.send({ message: `${result[0]} row(s) affected` }); //로우를 출력
  } else {
    res.status(404).send({ message: "There is no tavle with the id!" });
  }
});

app.delete("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const deleteCount = await Member.destroy({ where: { userId: id } }); //조건대로 삭제
  if (deleteCount) {
    res.send({ message: `${deleteCount} row(s) deleted` });
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

// Tables --------------------------------------------------------------------------------

app.get("/api/tables", async (req, res) => {
  // 스터디목록
  const { tag } = req.query;
  console.log(`api/tables - ${tag}`);
  if (tag) {
    const tableSearch = await Table.findAll({
      where: { tag },
      order: [["updatedAt", "DESC"]],
    });
    console.log("로드결과 : " + tableSearch);
    res.send(tableSearch);
  } else {
    const tables = await Table.findAll();
    res.send(tables);
  }
});

app.get("/api/tables/:id", async (req, res) => {
  // 특정 스터디
  const { id } = req.params;
  const tableSearch = await Table.findOne({
    where: { id },
  });
  res.send(tableSearch);
});

app.get("/api/tables/myStudy/:id", async (req, res) => {
  // 내 스터디
  const { id } = req.params;
  const tableSearch = await Table.findAll({
    where: { userList: { [Op.like]: `%${id}%` } },
    order: [["updatedAt", "DESC"]],
  });
  res.send(tableSearch);
});

app.post("/api/tables", upload.single("file"), async (req, res) => {
  //스터디추가
  const newStudy = req.body;
  const study = Table.build(newStudy);
  await study.save();
  res.send(newStudy);
});

app.get("/api/tables/search", async (req, res) => {
  // 스터디 검색 - 검색단어가 없다?
  const tableSearch = [];
  res.send(tableSearch);
});

app.get("/api/tables/search/:searchText", async (req, res) => {
  // 스터디 검색
  const { searchText } = req.params;
  console.log(searchText);
  const tableSearch = [];
  tableSearch.push(
    await Table.findAll({
      where: { title: { [Op.like]: `%${searchText}%` } },
      order: [["updatedAt", "DESC"]],
    })
  );
  tableSearch.push(
    await Table.findAll({
      where: { content: { [Op.like]: `%${searchText}%` } },
      order: [["updatedAt", "DESC"]],
    })
  );
  tableSearch.push(
    await Table.findAll({
      where: { tag: { [Op.like]: `%${searchText}%` } },
      order: [["updatedAt", "DESC"]],
    })
  );
  // const tableSearch = await Table.findAll({
  //   where: {
  //     [Op.or]: [
  //       { title: { [Op.like]: `%${searchText}%` } },
  //       { content: { [Op.like]: `%${searchText}%` } },
  //       { tag: { [Op.like]: `%${searchText}%` } },
  //     ],
  //   },
  //   order: [["updatedAt", "DESC"]],
  // });
  res.send(tableSearch);
});

app.delete("/api/tables/:id", async (req, res) => {
  const { id } = req.params;
  const deleteCount = await Table.destroy({ where: { id } }); //조건대로 삭제
  if (deleteCount) {
    res.send({ message: `${deleteCount} row(s) deleted` });
  } else {
    res.status(404).send({ message: "failed delete." });
  }
});

app.put("/api/tables/:id", upload.single("imageUrl"), async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const result = await Table.update(newInfo, { where: { id } });
  if (result[0]) {
    res.send({ message: `${result[0]} row(s) affected` }); //로우를 출력
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

// Comments --------------------------------------------------------------------------------

app.get("/api/comments/:studyId", async (req, res) => {
  // 댓글 불러오기
  const { studyId } = req.params;
  const comments = await Comment.findAll({
    where: { studyId },
    order: [["updatedAt", "DESC"]],
  });
  res.send(comments);
});

app.post("/api/comments", upload.single("file"), async (req, res) => {
  // 댓글쓰기
  const newTable = req.body;
  const table = Comment.build(newTable);
  await table.save();
  res.send(newTable);
});

app.delete("/api/comments/:id", async (req, res) => {
  const { id } = req.params;
  const deleteCount = await Comment.destroy({ where: { id } }); //조건대로 삭제
  if (deleteCount) {
    res.send({ message: `${deleteCount} row(s) deleted` });
  } else {
    res.status(404).send({ message: "failed delete." });
  }
});
app.put("/api/comments/:id", upload.single("imageUrl"), async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const result = await Comment.update(newInfo, { where: { id } });
  if (result[0]) {
    res.send({ message: `${result[0]} row(s) affected` }); //로우를 출력
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/Front/build", "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`${port} 접속 성공`);
});
