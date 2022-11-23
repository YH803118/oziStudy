import React, { useState, useEffect } from "react";
import "./Tag.css";

const Tag = ({ onChange, value }) => {
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

  useEffect(() => {
    const tagData = tagList.join(",");
    onChange("tag", tagData);
    console.log(value);
  }, [tagList]);

  return (
    <>
      <input
        type="text"
        onKeyPress={onKeyPress}
        onChange={(e) => setTagItem(e.target.value)}
        value={tagItem}
      />
      <ul class="tag">
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
