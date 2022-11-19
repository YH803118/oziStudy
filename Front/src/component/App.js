// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyList from "./StudyList";
import TopMenu from "./TopMenu";
import JoinForm from "./JoinForm";
import ModForm from "./ModForm";

function App() {
  // const [login, setLogin] = useState(false);
  // 유저 정보를 담아올 예정
  // TopMenu에 넘겨주면 true일 경우(정보가 있는 경우=로그인 한 경우) 프사와 이름을 리턴
  // false일 경우(정보가 없는 경우=로그인 하지 않은 경우) 아이디 비밀번호 인풋을 리턴

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TopMenu />
                <StudyList />
              </>
            }
          />
          <Route path="joinForm" element={<JoinForm />} />
          <Route path="modForm" element={<ModForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
