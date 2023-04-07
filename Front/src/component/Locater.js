import { useEffect } from "react";
import { Link } from "react-router-dom";
import Bottom from "./Bottom";
import StudyFormDetail from "./StudyFormDetail";
import StudyList from "./StudyList";
import "./StudyList.css";
import TopMenu from "./TopMenu";
function Locater({ location, item, onMyStudy, onLoad, onLogin }) {
  useEffect(() => {}, [sessionStorage.getItem("userId")]);
  return (
    <>
      <TopMenu onMyStudy={onMyStudy} onLoad={onLoad} onLogin={onLogin} />
      {location == "studyFormDetail" && <StudyFormDetail item={item} />}
      {location == "myStudy" && <StudyList items={item} />}
      {sessionStorage.getItem("userId") && location != "studyFormDetail" && (
        <Link to="/studyInputForm" className="studyInputBtn">
          +
        </Link>
      )}
      <Bottom />
    </>
  );
}
// 검색 후 새로고침하면 첫화면으로 돌아가는 문제가 있음.
export default Locater;
