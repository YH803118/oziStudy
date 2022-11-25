// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudyList from "./StudyList";
import TopMenu from "./TopMenu";
import JoinForm from "./JoinForm";
import ModForm from "./ModForm";
import StudyFormDetail from "./StudyFormDetail";
// import MyStudy from "./MyStudy";
import { getMyStudy, getStudyList, getUserInfo, search } from "../api";
import { useEffect, useState } from "react";

import "./App.css";
import StudyInputForm from "./StudyInputForm";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

function App() {
  let sessionStorage = window.sessionStorage;
  const [item, setItem] = useState([]);
  const [login, setLogin] = useState(sessionStorage.getItem("userId"));

  const handleLoad = async () => {
    let result;
    result = await getStudyList();
    setItem(result);
  };
  const handleMyStudy = async () => {
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

  // const handleLogout = () => {
  //   setLogin(false);
  //   sessionStorage.clear();
  // };

  useEffect(() => {
    handleLoad();
  }, [sessionStorage.getItem("userId")]);

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
                  onLoad={handleLoad}
                  onLogin={setLogin}
                  // onSessionClear={handleSessionClear}
                />
                <SearchForm onLoad={handleLoad} />
                <StudyList items={item} />
                {sessionStorage.getItem("userId") && (
                  <Link to="studyInputForm" id="studyInputBtn">
                    스터디만들기
                  </Link>
                )}
              </>
            }
          />
          <Route path="joinForm" element={<JoinForm />} />
          <Route
            path="studyInputForm"
            element={<StudyInputForm userId={login} />}
          />
          <Route path="modForm" element={<ModForm />} />
          <Route
            path="studyFormDetail/:id"
            element={<StudyFormDetail item={item} />}
          />
          <Route
            exact
            path="/search/:searchText"
            element={
              <SearchResult onMyStudy={handleMyStudy} onLogin={setLogin} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
