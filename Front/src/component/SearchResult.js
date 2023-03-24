import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { search } from "../api";
import Bottom from "./Bottom";
import SearchForm from "./SearchForm";
import SearchResultList from "./SearchResultList";
import "./StudyList.css";
import TopMenu from "./TopMenu";
function SearchResult({ onMyStudy, onLoad, onLogin }) {
  const searchText = window.location.search.split("=")[1];
  const [searchItem, setSearchItem] = useState([]);
  console.log(searchText);
  const handleSearch = async () => {
    let result = await search(searchText);
    setSearchItem(result);
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div className="album  bg-light">
      <TopMenu onMyStudy={onMyStudy} onLoad={onLoad} onLogin={onLogin} />
      <SearchForm />
      <div className="container">
        <div className="g-2">
          {searchItem[0] && (
            <>
              <SearchResultList items={searchItem[0]} search="제목 검색 결과" />
              <hr />
              <SearchResultList items={searchItem[1]} search="내용 검색 결과" />
              <hr />
              <SearchResultList items={searchItem[2]} search="태그 검색 결과" />
            </>
          )}
        </div>
      </div>
      {sessionStorage.getItem("userId") && (
        <Link to="studyInputForm" id="studyInputBtn">
          스터디만들기
        </Link>
      )}
      <Bottom />
    </div>
  );
}
export default SearchResult;
