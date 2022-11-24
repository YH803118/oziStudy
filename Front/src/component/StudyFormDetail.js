import { useParams } from "react-router-dom";
import { useState } from "react";
import { modTable } from "../api";

function StudyFormDetail({ item }) {
  const [join, setJoin] = useState(false);
  const { id } = useParams();
  let sessionStorage = window.sessionStorage;
  let studyDetail = {};
  for (const i of item) {
    if (i.id === id) {
      studyDetail = i;
      break;
    }
  }
  const { title, tag, leader, content, endDate, userList } = studyDetail;
  let studyJoiner = [];
  studyJoiner = userList.split(",");

  const handleJoin = async () => {
    var confirmer = window.confirm("스터디에 참가 하시겠습니까?");
    if (confirmer) {
      studyJoiner.push(sessionStorage.getItem("userId"));
      const joiner = { studyJoiner };
      const check = await modTable(id, joiner);
      if (check) setJoin(true);
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
