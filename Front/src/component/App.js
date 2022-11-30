import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudyList from "./StudyList";
import TopMenu from "./TopMenu";
import JoinForm from "./JoinForm";
import ModForm from "./ModForm";
import { getMyStudy, getStudyList } from "../api";
import { useEffect, useState } from "react";

import "./App.css";
import StudyInputForm from "./StudyInputForm";
import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";
import Locater from "./Locater";

function App() {
  let sessionStorage = window.sessionStorage;
  let localStorage = window.localStorage;
  const [item, setItem] = useState([]);
  const [login, setLogin] = useState(sessionStorage.getItem("userId"));

  const handleLoad = async () => {
    setItem(await getStudyList());
  };
  const handleMyStudy = async () => {
    setItem(await getMyStudy(login));
  };
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
                <hr id="topHR"></hr>
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
            path="/myStudy"
            element={
              <Locater
                location="myStudy"
                item={item}
                onMyStudy={handleMyStudy}
                onLoad={handleLoad}
                onLogin={setLogin}
              />
            }
          />
          <Route
            path="studyInputForm"
            element={<StudyInputForm userId={login} />}
          />
          <Route path="modForm" element={<ModForm item={item} />} />
          <Route
            path="/studyFormDetail/:id"
            element={
              <Locater
                location="studyFormDetail"
                item={item}
                onMyStudy={handleMyStudy}
                onLoad={handleLoad}
                onLogin={setLogin}
              />
            }
          />
          <Route
            exact
            path="/search/:searchText"
            element={
              <SearchResult
                onMyStudy={handleMyStudy}
                onLoad={handleLoad}
                onLogin={setLogin}
              />
            }
          />
          {/* <Route
            exact
            path="/search?searchText="
            element={
              <SearchResult
                onMyStudy={handleMyStudy}
                onLoad={handleLoad}
                onLogin={setLogin}
              />
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
