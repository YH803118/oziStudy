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
        to={`studyFormDetail/${id}`}
        className="StudyForm"
        onClick={handleDetail}
      >
        <div className="title">{title}</div>
        <div className="leader"> 리더 : {leader}</div>
        <div className="tags">
          {tagArr &&
            tagArr.map((item) => {
              return (
                <span key={item} className="tagSpan">
                  {item}
                </span>
              );
            })}
        </div>
        <div className="content">{content}</div>
        <div className="endDate">{endDate}</div>
      </Link>
    </>
  );
}

export default StudyForm;
