import { useParams } from "react-router-dom";
import { useState } from "react";
import { modMember, modTable } from "../api";
import axios from "axios";
import { useAsync } from "react-async";

export const getUserInfo = async ({ userId }) => {
  const { id, studyList } = await axios.get(
    `http://localhost:3000/api/members/${userId}`
  );
  return { id, userId, studyList };
};

function StudyFormDetail({ item }) {
  console.log(item);
  const [join, setJoin] = useState(false);
  const { id } = useParams();
  console.log(id);
  let sessionStorage = window.sessionStorage;
  let studyDetail = {};
  for (const i of item) {
    if (i.id === id) {
      studyDetail = i;
      break;
    }
  }
  console.log(studyDetail);
  const { title, tag, leader, content, endDate, userList } = studyDetail;

  const { data: user } = useAsync({
    promiseFn: getUserInfo,
    id: sessionStorage.getItem("userId"),
  });

  const handleJoin = async () => {
    var confirmer = window.confirm("스터디에 참가 하시겠습니까?");
    if (confirmer) {
      const joiner = { userList: userList + "," + user.id };
      const study = { studyList: user.studyList + "," + id };
      const check1 = await modMember(user.userId, study);
      const check2 = await modTable(id, joiner);
      if (check1 && check2) setJoin(true);
    } else {
      return;
    }
  };
  return (
    <>
      <div className="StudyFormDetail">
        <div className="title">{title}</div>
        <div className="leader">{leader}</div>
        <div className="tags">{tag}</div>
        <div className="content">{content}</div>
        <div className="endDate">{endDate}</div>
        {join || <button onClikc={handleJoin}>참가하기</button>}
      </div>
    </>
  );
}

export default StudyFormDetail;
