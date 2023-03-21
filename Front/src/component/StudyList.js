import StudyForm from "./StudyForm";
import "./StudyList.css";

function StudyList({ items }) {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 g-2">
        {items &&
          items.map((item) => {
            return <StudyForm key={item.id} item={item} />;
          })}
      </div>
    </div>
  );
}

export default StudyList;
