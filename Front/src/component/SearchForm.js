import { useState } from "react";
import "./SearchForm.css";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../api";
import axios from "axios";

function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const textCheck = (e) => {
    if (searchText.length < 2) {
      alert("검색은 두 글자 이상부터 가능합니다.");
      e.preventDefault();
      return;
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const params = new URLSearchParams();

  //   params.append("searchText", searchText);

  //   axios.get("/search", params);
  // };

  return (
    <>
      <form id="searchForm" action="search">
        <input
          type="text"
          name="searchText"
          onChange={handleChange}
          placeholder="검색어 입력"
        />
        <button type="submit">검색</button>
      </form>
      {/* <Link to={`/search/${searchText}`} onClick={textCheck}>
        링크
      </Link> */}
    </>
  );
}

export default SearchForm;
