import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { modMember, modTable } from "../api";
import axios from "axios";
import { useAsync } from "react-async";
import "./StudyFormDetail.css";

export const getUserInfo = async ({ userId }) => {
  console.log(userId);
  if (userId) {
    const userInfo = await axios.get(
      `http://localhost:3000/api/members/${userId}`
    );
    console.log(userInfo.data);
    return userInfo.data;
  }
};

function StudyFormDetail({ item }) {
  const [join, setJoin] = useState(false);
  const { id } = useParams();
  let tagArr = [];

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
  for (const tags of tag.split(",")) {
    tagArr.push(tags);
  }

  useEffect(() => {
    const userListArray = userList.split(",");
    if (userListArray.includes(userId)) setJoin(true);
  }, [sessionStorage.getItem("userId")]);

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
        <hr></hr>

        <div className="tags">
          {tagArr &&
            tagArr.map((item) => {
              return (
                <span key={item} className="tagSpan">
                  # {item}
                </span>
              );
            })}
        </div>
        <div className="contentDetail">{content}</div>
        <div className="endDate">{endDate}</div>
        <span className="leader">작성자 : {leader}</span>
        <br></br>
        {join || (
          <button className="joinBtn" onClick={handleJoin}>
            참가하기
          </button>
        )}
      </div>
    </>
  );
}

export default StudyFormDetail;
