import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMyStudy } from "../api";
import StudyFormDetail from "./StudyFormDetail";
import StudyList from "./StudyList";
import "./StudyList.css";
import TopMenu from "./TopMenu";
function Locater({ location, item, onMyStudy, onLoad, onLogin }) {
  useEffect(() => {}, [sessionStorage.getItem("userId")]);
  return (
    <>
      <TopMenu onMyStudy={onMyStudy} onLoad={onLoad} onLogin={onLogin} />
      <hr id="topHR"></hr>
      {location == "studyFormDetail" && <StudyFormDetail item={item} />}
      {location == "myStudy" && <StudyList items={item} />}
      {sessionStorage.getItem("userId") && location != "studyFormDetail" && (
        <Link to="/studyInputForm" id="studyInputBtn">
          스터디만들기
        </Link>
      )}
    </>
  );
}
// 검색 후 새로고침하면 첫화면으로 돌아가는 문제가 있음.
export default Locater;
