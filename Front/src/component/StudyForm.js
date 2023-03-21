import "./StudyForm.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function StudyForm({ item }) {
  let { id, title, tag, leader, content, endDate } = item;
  const [maxTitle, setMaxTitle] = useState(title);
  let tagArr = tag.split(",");

  const handleResize = () => {
    console.log("resize");
    if (window.innerWidth / 63 <= title.length) {
      setMaxTitle(title.slice(0, 15) + "...");
    } else setMaxTitle(title);
  };

  useEffect(() => {
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
        <span className="leader">{leader}</span>
        <span className="endDate">{endDate}</span>
      </Link>
    </div>
  );
}

export default StudyForm;
