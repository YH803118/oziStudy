import { useState } from "react";
import "./SearchForm.css";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../api";

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

  // const handleSubmit = (e) => {
  //   // e.preventDefault();
  //   // search(searchText);
  //   // navigate(`/search?searchText=${searchText}`);
  //   // navigate("studyInputForm");
  //   console.log("sumbit");
  // };

  return (
    <>
      <form
        id="searchForm"
        action="http://localhost:3000/search"
        // onSubmit={handleSubmit}
      >
        <input type="text" name="searchText" onChange={handleChange} />
        <button type="submit">검색</button>
      </form>
      <Link to={`/search/${searchText}`} onClick={textCheck}>
        링크
      </Link>
    </>
  );
}

export default SearchForm;
