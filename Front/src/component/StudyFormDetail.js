function StudyFormDetail({ item }) {
  const studyId = sessionStorage.getItem("studyId");

  const { title, tag, leader, content, endDate } = item[studyId - 1];
  return (
    <>
      <div className="StudyFormDetail">
        <div className="title">{title}</div>
        <div className="leader">{leader}</div>
        <div className="tags">{tag}</div>
        <div className="content">{content}</div>
        <div className="endDate">{endDate}</div>
      </div>
    </>
  );
}

export default StudyFormDetail;
