import StudyForm from "./StudyForm";
import downBtn from "../img/down.png";
import "./StudyList.css";

function StudyList({ items, handleClick }) {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 g-2">
        {items &&
          items.map((item) => {
            return <StudyForm item={item} />;
          })}
      </div>
      <div className="downBtn align-items-center">
        <img src={downBtn} alt="더보기" onClick={handleClick} />
      </div>
    </div>
  );
}

export default StudyList;
