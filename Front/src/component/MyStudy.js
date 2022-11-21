// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudyList from "./StudyList";
import TopMenu from "./TopMenu";
import JoinForm from "./JoinForm";
import ModForm from "./ModForm";
import { getMyStudy } from "../api";
import { useState } from "react";

function MyStudy() {
  const [item, setItem] = useState([]);

  const handleLoad = async () => {
    let result;
    result = await getMyStudy();
    setItem(result);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TopMenu />
                <StudyList itmes={item} />
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

export default MyStudy;
