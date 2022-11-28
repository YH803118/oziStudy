import "./StudyForm.css";

import { Link } from "react-router-dom";
function StudyForm({ item }) {
  const { id, title, tag, leader, content, endDate } = item;
  let tagArr = [];
  for (const tags of tag.split(",")) {
    tagArr.push(tags);
  }
  const handleDetail = () => {
    sessionStorage.setItem("studyId", id);
  };
  return (
    <>
      <Link
        to={`/studyFormDetail/${id}`}
        className="StudyForm"
        onClick={handleDetail}
      >
        <span className="title">{title}</span>
        <hr></hr>

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
    </>
  );
}

export default StudyForm;
