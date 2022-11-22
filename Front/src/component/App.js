// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudyList from "./StudyList";
import TopMenu from "./TopMenu";
import JoinForm from "./JoinForm";
import ModForm from "./ModForm";
// import MyStudy from "./MyStudy";
import { getMyStudy, getStudyList, getUser, getUserInfo } from "../api";
import { useEffect, useState } from "react";

import "./App.css";
import StudyInputForm from "./StudyInputForm";

function App() {
  const [item, setItem] = useState([]);
  const [login, setLogin] = useState("Logout");

  let sessionStorage = window.sessionStorage;

  const handleLoad = async () => {
    let result;
    result = await getStudyList();
    setItem(result);
  };
  const handleMyStudy = async () => {
    const user = sessionStorage.getItem("userInfo");
    // 내 스터디 검색해서 넣을 예정
    // 아이디를 통해 members에서 studyList를 가져와서
    // tables에서 다시 검색
    let result = [];
    const { studyList } = await getUserInfo(sessionStorage.getItem("userId"));
    const studyArr = studyList.split(",");
    setItem([]);
    for (const study of studyArr) {
      const pushStudy = await getMyStudy(study);
      result.push(pushStudy[0]);
    }
    setItem(result);
    console.log(result);
  };

  // const handleSessionClear = () => {
  //   console.log("handleSession");
  //   sessionStorage.clear();
  // };

  // const handleSessionSet = (item) => {
  //   console.log("handleSessionSet");
  //   sessionStorage.setItem();
  // };

  const handleLogout = () => {
    setLogin("Login");
  };

  useEffect(() => {
    setLogin("Logout");
    // setItem([]);
    console.log("useEffect");
    handleLoad();
  }, [login, sessionStorage]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TopMenu
                  onMyStudy={handleMyStudy}
                  onLogout={handleLogout}
                  // onSessionClear={handleSessionClear}
                />
                <StudyList items={item} />
                <Link to="studyInputForm" id="studyInputBtn">
                  스터디만들기
                </Link>
              </>
            }
          />
          <Route path="joinForm" element={<JoinForm />} />
          <Route path="studyInputForm" element={<StudyInputForm />} />
          <Route path="modForm" element={<ModForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
