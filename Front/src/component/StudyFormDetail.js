import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { delStudy, modMember, modTable } from "../api";
import axios from "axios";
import { useAsync } from "react-async";
import "./StudyFormDetail.css";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";
export const getUserInfo = async ({ userId }) => {
  console.log(userId);
  if (userId) {
    const userInfo = await axios.get(`http://localhost:3000/api/members/${userId}`);
    console.log(userInfo.data);
    return userInfo.data;
  }
};

function StudyFormDetail({ item }) {
  const [join, setJoin] = useState(false);
  const [leaderCheck, setLeaderCheck] = useState(false);
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
  const { title, tag, leader, content, endDate, userList } = JSON.parse(localStorage.getItem("studyDetail"));
  for (const tags of tag.split(",")) {
    tagArr.push(tags);
  }

  useEffect(() => {
    setLeaderCheck(leader == userId);
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

  const handleEndStudy = (e) => {
    let confirmer = window.confirm("스터디를 끝내시겠습니까? 대충 경고문");
    // 기록을 남길까말까 - 남기기 위해선 끝났는지 안끝났는지에 대한 속성 추가 필요
    // 일단 남기지 않는 코드
    if (confirmer) {
      delStudy(id);
    } else e.preventDefault();
  };

  return (
    <>
      <div className="StudyFormDetail bg-white shadow-sm">
        <div className="title">{title}</div>

        <div className="tags">
          {tagArr &&
            tagArr.map((item) => {
              return (
                <span key={item} className="tagSpan">
                  # {item}
                </span>
              );
            })}
          <span className="leader">작성자 : {leader}</span>
        </div>
        <hr></hr>
        <div className="contentDetail">{content}</div>
        <div className="endDate">{endDate}</div>

        <div className="btnDiv">
          {leaderCheck && (
            <>
              <Link className="detailBtn" to={`/studyInputForm/${id}`}>
                수정
              </Link>
              <Link className="detailBtn" to="/" onClick={handleEndStudy}>
                끝내기
              </Link>
            </>
          )}
          {join && sessionStorage.getItem("userId") ? (
            <></>
          ) : (
            <button className="joinBtn" onClick={handleJoin}>
              참가하기
            </button>
          )}
        </div>
        <CommentList studyId={id} />
      </div>
    </>
  );
}

export default StudyFormDetail;
