import "./StudyForm.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function StudyForm({ item }) {
  let { id, title, tag, leader, content, createdAt } = item;
  const [maxTitle, setMaxTitle] = useState(title);
  let tagArr = tag.split(",");

  const handleResize = () => {
    const width = window.innerWidth;
    if (width > 574) {
      if (width / 63 <= title.length) {
        setMaxTitle(title.slice(0, Math.floor(width / 60)) + "...");
      } else setMaxTitle(title);
    } else {
      if ((width - 50) / 21 <= title.length) {
        setMaxTitle(title.slice(0, Math.floor(width / 25)) + "...");
      } else setMaxTitle(title);
    }
    console.log(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDetail = () => {
    sessionStorage.setItem("studyId", id);
  };
  return (
    <div className="col">
      <Link to={`/studyFormDetail/${id}`} className="card shadow-sm" onClick={handleDetail}>
        <span className="title">{maxTitle}</span>
        <hr />

        <div className="tags">
          {tagArr &&
            tagArr.map((item) => {
              return (
                <span key={item} className="tagSpan">
                  # {item}
                </span>
              );
            })}
        </div>
        <div className="content">{content}</div>
        <div className="d-flex">
          <span className="createdAt">{createdAt.split("T")[0]}</span>
          <span className="leader">{leader}</span>
        </div>
      </Link>
    </div>
  );
}

export default StudyForm;
