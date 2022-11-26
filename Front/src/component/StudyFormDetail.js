import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { modMember, modTable } from "../api";
import axios from "axios";
import { useAsync } from "react-async";

export const getUserInfo = async ({ userId }) => {
  if (userId) {
    const userInfo = await axios.get(
      `http://localhost:3000/api/members/${userId}`
    );
    return userInfo.data;
  }
};

function StudyFormDetail({ item }) {
  const [join, setJoin] = useState(false);
  const { id } = useParams();

  // let sessionStorage = window.sessionStorage;

  const userId = sessionStorage.getItem("userId");

  const { data: user } = useAsync({
    promiseFn: getUserInfo,
    userId,
    watch: userId,
  });

  if (item[0]) {
    let studyDetail = {};
    for (const i of item) {
      if (i.id == id) {
        studyDetail = i;
        break;
      }
    }
    localStorage.setItem("studyDetail", JSON.stringify(studyDetail));
  }
  const { title, tag, leader, content, endDate, userList } = JSON.parse(
    localStorage.getItem("studyDetail")
  );

  useEffect(() => {
    if (userList.includes(userId)) setJoin(true);
  }, []);

  const handleJoin = async () => {
    if (userId == null) {
      alert("로그인이 필요합니다!");
      return;
    }
    var confirmer = window.confirm("스터디에 참가 하시겠습니까?");
    if (confirmer) {
      const formData1 = new FormData();
      const formData2 = new FormData();
      formData1.append("studyList", user.studyList + "," + id);
      formData2.append("userList", userList + "," + userId);
      const check1 = await modMember(userId, formData1);
      const check2 = await modTable(id, formData2);
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
        {join || <button onClick={handleJoin}>참가하기</button>}
      </div>
    </>
  );
}

export default StudyFormDetail;
