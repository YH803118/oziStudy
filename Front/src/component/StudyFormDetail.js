function StudyForm(item) {
  const { leader, title, tag, userId, content, endDate } = item;
  return (
    <div className="StudyForm">
      <div className="title">{title}</div>
      <div className="tags">
        {tag.maps((tag) => {
          return <label>{tag}</label>;
        })}{" "}
      </div>
      <div className="content">{content}</div>
      <div className="endDate">{endDate}</div>
      <div className="userId">
        {userId.maps((user) => {
          return <img src=""></img>;
        })}
      </div>
    </div>
  );
}

export default StudyForm;
