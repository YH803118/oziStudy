import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { search } from "../api";
import SearchForm from "./SearchForm";
import SearchResultList from "./SearchResultList";
import "./StudyList.css";
import TopMenu from "./TopMenu";
function SearchResult({ onMyStudy, onLoad, onLogin }) {
  const { searchText } = useParams();
  const [searchItem, setSearchItem] = useState([]);

  const handleSearch = async () => {
    if (searchText.length < 2) {
      alert("검색은 두 글자 이상부터 가능합니다.");
      return;
    }
    let result = await search(searchText);
    setSearchItem(result);
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <>
      <TopMenu
        onMyStudy={onMyStudy}
        onLoad={onLoad}
        onLogin={onLogin}
        // onSessionClear={handleSessionClear}
      />
      <SearchForm />
      {searchItem[0] && (
        <>
          <SearchResultList items={searchItem[0]} search="제목 검색 결과" />
          <SearchResultList items={searchItem[1]} search="내용 검색 결과" />
          <SearchResultList items={searchItem[2]} search="태그 검색 결과" />
        </>
      )}
      {sessionStorage.getItem("userId") && (
        <Link to="studyInputForm" id="studyInputBtn">
          스터디만들기
        </Link>
      )}
    </>
  );
}
// 검색 후 새로고침하면 첫화면으로 돌아가는 문제가 있음.
export default SearchResult;
