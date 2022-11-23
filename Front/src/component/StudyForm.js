import "./StudyForm.css";

import { Link } from "react-router-dom";
function StudyForm({ item }) {
  const { id, title, tag, leader, content, endDate } = item;
  console.log(item);
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
        <div className="leader">{leader}</div>
        <div className="tags">{tag}</div>
        <div className="content">{content}</div>
        <div className="endDate">{endDate}</div>
      </Link>
    </>
  );
}

export default StudyForm;
