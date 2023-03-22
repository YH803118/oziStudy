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
      {/* <form id="searchForm" action="search"> */}
      {/* <div className="searchInput"> */}
      <div id="searchForm" class="searchInput d-flex align-items-center bg-light">
        <form class="w-100 me-3" action="search">
          <input
            type="search"
            name="searchText"
            onChange={handleChange}
            class="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
      </div>
      {/* </div> */}
      {/* <button type="submit" className="">검색</button> */}
      {/* </form> */}
    </>
  );
}

export default SearchForm;
