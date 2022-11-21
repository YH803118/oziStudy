import StudyForm from "./StudyForm";
import "./StudyList.css";

function StudyList({ items }) {
  // map이용해서 반복해서 가져올것
  return (
    <div className="StudyList">
      {items &&
        items.map((item) => {
          return <StudyForm key={item.id} item={item} />;
        })}
    </div>
  );
}

export default StudyList;
