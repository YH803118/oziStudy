import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchForm from "./SearchForm";
import StudyFormDetail from "./StudyFormDetail";
import "./StudyList.css";
import TopMenu from "./TopMenu";
function Locater({ location, item, onMyStudy, onLoad, onLogin }) {
  useEffect(() => {}, []);
  return (
    <>
      <TopMenu
        onMyStudy={onMyStudy}
        onLoad={onLoad}
        onLogin={onLogin}
        // onSessionClear={handleSessionClear}
      />
      {/* <SearchForm /> */}
      {location == "studyFormDetail" && <StudyFormDetail item={item} />}
      {sessionStorage.getItem("userId") && (
        <Link to="studyInputForm" id="studyInputBtn">
          스터디만들기
        </Link>
      )}
    </>
  );
}
// 검색 후 새로고침하면 첫화면으로 돌아가는 문제가 있음.
export default Locater;
