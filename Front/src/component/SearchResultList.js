import StudyForm from "./StudyForm";
import "./StudyList.css";

function SearchResultList({ items, search }) {
  return (
    <div className="StudyList">
      <h3>{search}</h3>
      <br></br>
      {items[0] ? (
        items.map((item) => {
          return <StudyForm key={item.id} item={item} />;
        })
      ) : (
        <h3>검색 결과가 없습니다.</h3>
      )}
    </div>
  );
}

export default SearchResultList;
