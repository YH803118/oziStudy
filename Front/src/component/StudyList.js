import StudyForm from "./StudyForm";
import "./StudyList.css";

function StudyList({ items }) {
  // map이용해서 반복해서 가져올것
  // items에 들어 오는 값이 전체 스터디목록이거나
  // 내 스터디만 이거나
  console.log(items);
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
