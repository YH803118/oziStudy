import React, { useState } from "react";
import "./Tag.css";

const Tag = () => {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    setTagList((prevItem) => [...prevItem, tagItem]);
    setTagItem("");
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  return (
    <>
      <input
        type="text"
        onKeyPress={onKeyPress}
        onChange={(e) => setTagItem(e.target.value)}
        value={tagItem}
      />
      <ul className="tag">
        {tagList.map((tag) => {
          return (
            <>
              <li onClick={deleteTagItem}>{tag}</li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default Tag;
