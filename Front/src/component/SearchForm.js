import { useState } from "react";
import "./SearchForm.css";
import { Link } from "react-router-dom";

function SearchForm() {
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <form id="searchForm" actions="../">
      <span>ㅜㅜ왜 평행안맞아</span>
      <input type="text" name="searchText" onChange={handleChange} />
      <Link to={`search/${searchText}`}>
        <button type="submit">검색</button>
      </Link>
    </form>
  );
}

export default SearchForm;
