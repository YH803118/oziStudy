import { useParams } from "react-router-dom";

function StudyFormDetail({ item }) {
  const { id } = useParams();
  let studyDetail = [];
  for (const i of item) {
    if (i.id === id) {
      studyDetail = i;
      break;
    }
  }
  console.log(studyDetail);
  const { title, tag, leader, content, endDate } = studyDetail;
  return (
    <>
      <div className="StudyFormDetail">
        <div className="title">{title}</div>
        <div className="leader">{leader}</div>
        <div className="tags">{tag}</div>
        <div className="content">{content}</div>
        <div className="endDate">{endDate}</div>
        <button>참가하기</button>
      </div>
    </>
  );
}

export default StudyFormDetail;
