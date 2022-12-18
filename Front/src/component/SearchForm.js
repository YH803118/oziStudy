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

  return (
    <>
      <form id="searchForm" action="search">
        <div className="searchInput">
          <input
            type="text"
            name="searchText"
            onChange={handleChange}
            placeholder="검색어 입력"
          />
        </div>
        <button type="submit">검색</button>
      </form>
    </>
  );
}

export default SearchForm;
