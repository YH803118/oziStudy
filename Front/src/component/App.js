// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudyList from "./StudyList";
import TopMenu from "./TopMenu";
import JoinForm from "./JoinForm";
import ModForm from "./ModForm";
// import MyStudy from "./MyStudy";
import { getStudyList } from "../api";
import { useEffect, useState } from "react";

import "./App.css";
import StudyInputForm from "./StudyInputForm";

function App() {
  const [item, setItem] = useState([]);
  const [myStudy, setMyStudy] = useState(false);
  // const [login, setLogin] = useState(false);
  // 유저 정보를 담아올 예정
  // TopMenu에 넘겨주면 true일 경우(정보가 있는 경우=로그인 한 경우) 프사와 이름을 리턴
  // false일 경우(정보가 없는 경우=로그인 하지 않은 경우) 아이디 비밀번호 인풋을 리턴

  const handleLoad = async () => {
    let result;
    // try {
    //   setIsLoading(true);
    result = await getStudyList();
    // } catch (error) {
    //   console.log("로드실패");
    //   console.log(error);
    //   return;
    // } finally {
    //   setIsLoading(false);
    // }
    setItem(result);
  };
  const handleMyStudy = () => {
    console.log("MYSTUDY");
    // 내 스터디 검색해서 넣을 예정
  };

  useEffect(() => {
    handleLoad();
    console.log(item);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TopMenu onMyStudy={handleMyStudy} />
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
