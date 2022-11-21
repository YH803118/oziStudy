import "./StudyForm.css";
function StudyForm(item) {
  console.log(item);
  const { title, tag, leader, content, endDate } = item.item;
  console.log(item.item);
  return (
    <div className="StudyForm">
      <div className="title">{title}</div>
      <div className="leader">{leader}</div>
      <div className="tags">{tag}</div>
      <div className="content">{content}</div>
      <div className="endDate">{endDate}</div>
      {/* <div className="userId">
        {userId.maps((user) => {
          return <img src=""></img>;
        })}
      </div> */}
    </div>
  );
}

export default StudyForm;
