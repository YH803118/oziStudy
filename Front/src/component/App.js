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
  const [searchItem, setSearchItem] = useState([]);
  const [login, setLogin] = useState(sessionStorage.getItem("userId"));
  const handleLoad = async () => {
    let result;
    result = await getStudyList();
    setItem(result);
  };
  const handleMyStudy = async () => {
    // const user = sessionStorage.getItem("userInfo");
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

  const handleLogout = () => {
    setLogin(false);
  };

  const handleSearch = async (e) => {
    const { value } = e.target.searchText;
    console.log(value);
    if (value.length < 2) {
      alert("검색은 두 글자 이상부터 가능합니다.");
      return;
    }
    let result = await search(value);
    console.log(result);
    setSearchItem(result);
  };

  useEffect(() => {
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
                  onLogin={setLogin}
                  // onSessionClear={handleSessionClear}
                />
                <SearchForm onSearch={handleSearch} />
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
            path="search/:searchText"
            element={
              <SearchResult
                items={searchItem}
                onMyStudy={handleMyStudy}
                onLogout={handleLogout}
                onLogin={setLogin}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
