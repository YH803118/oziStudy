import StudyForm from "./StudyForm";
import "./StudyList.css";

function StudyList() {
  // map이용해서 반복해서 가져올것
  return (
    <div className="StudyList">
      <StudyForm />
      <StudyForm />
      <StudyForm />
    </div>
  );
}

export default StudyList;
