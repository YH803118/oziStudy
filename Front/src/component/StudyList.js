import StudyForm from "./StudyForm";
import "./StudyList.css";

function StudyList({ items }) {
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
